app.service('timeSeriesGraphService', ['$log', 'runRequestService','timeSeriesAnnotationService', function ($log,runRequestService,timeSeriesAnnotationService) {


    // set the dimensions and margins of the graph
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;


    var trendLineColors = []

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var z = d3.scaleOrdinal(['#8cc2d0', '#152e34']);


    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var endZoomVector = d3.zoomIdentity.scale(1).translate(0, 0);

    var parseTime = d3.timeParse("%s");

    var line = d3.line()
        .x(function (d) { return x(d.Time); })
        .y(function (d) { return y(d.RTH); });


    var zoom = d3.zoom()
        .on('zoom', zoomed)
        .on('end', function () {
            var t = d3.event.transform;
            endZoomVector = t;
        })


    var svg = d3.select('svg');
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var graph = svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('class', 'graph')
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    graph.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



    svg.call(zoom);

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);


    var annotationGroup = graph.append('g').attr('class', 'annotation-group');


    //yLock
    var yLock = svg.append('g')
        .attr('transform', 'translate(' + (35) + ',' + (0) + ')')
        .attr('class', 'y-lock')
        .attr('locked', 0)

    yLock.append('svg:image')
        .attr('xlink:href', './assets/img/lock_unlocked.svg')
        .attr('width', '30')
        .attr('height', '30')
        .on('click', function () {
            lockToggle(yLock);
        });



    //xLock
    var xLock = svg.append('g')
        .attr('transform', 'translate(' + (width + 60) + ',' + (height + 35) + ')')
        .attr('class', 'x-lock')
        .attr('locked', 0)

    xLock.append('svg:image')
        .attr('xlink:href', './assets/img/lock_unlocked.svg')
        .attr('width', '30')
        .attr('height', '30')
        .on('click', function () {
            lockToggle(xLock);
        });

    getData(['2B497C4DAFF48A9C!160', '2B497C4DAFF48A9C!178'])

    function getData(idArray) {
        var getRunPromises = idArray.map(runRequestService.getRun);
        Promise.all(getRunPromises).then(function (result) {
            var results = [];
            for (var i = 0, n = result.length; i < n; i++) {
                var resultArray = dataObjectToArray(result[i].data.runData);
                results.push({ id: i, values: resultArray });
            }
            drawGraph(results);
        })
    }



    function dataObjectToArray(dataObject) {
        var dataArray = [];
        var objectKeys = Object.keys(dataObject);
        for (var i = 0, n = dataObject[objectKeys[0]].length; i < n; i++) {
            var row = {};
            for (var o = 0, m = objectKeys.length; o < m; o++) {
                row[objectKeys[o]] = Number(dataObject[objectKeys[o]][i]);
            }
            dataArray.push(row);
        }
        return dataArray;
    }



    function drawGraph(runsData) {
        var xDomain = [
            d3.min(runsData, function (c) { return d3.min(c.values, function (d) { return d.Time }) }),
            d3.max(runsData, function (c) { return d3.max(c.values, function (d) { return d.Time }) })
        ];
        x.domain(d3.extent(xDomain));
        z.domain(runsData.map(function (r) { return r.id }))

        y.domain([
            d3.min(runsData, function (c) { return d3.min(c.values, function (d) { return d.RTH; }); }),
            d3.max(runsData, function (c) { return d3.max(c.values, function (d) { return d.RTH; }); })
        ]);

        $log.log(runsData);

        graph.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        graph.append("g")
            .attr("class", "axis axis--y")
            .call(yAxis)

        var runGroup = graph.append('g')
            .attr('class', 'run-group')

        var runs = runGroup.selectAll(".run")
            .data(runsData)
            .enter().append("g")
            .attr("class", function (d) {
                return 'run' + d.id;
            })
            .on('click', function (d) {
                d3.select(this).moveToFront();
            });

        runs.append("path")
            .attr("class", "line")
            .attr("d", function (d) { return line(d.values); })
            .style("stroke", function (d) { return z(d.id); })

 
        timeSeriesAnnotationService.addAnnotation(undefined,{Time: 14000,RTH: 0.08616},'hi there');
        timeSeriesAnnotationService.addAnnotation(undefined,{Time: 14001,RTH: 0.0933},'hello there');
        annotationBadgeRender(timeSeriesAnnotationService.getAnnotations());
        
        

    }

    function annotationBadgeRender(annotations){
        var makeAnnotations = d3.annotation()
        .notePadding(15)
        .type(d3.annotationBadge)
        .accessors({
            x: d => x(d.Time),
            y: d => y(d.RTH)
        })
        .annotations(annotations)
        .on('subjectclick', annotationClick)
        annotationGroup.call(makeAnnotations);
    }

    function zoomed() {
        var t = d3.event.transform;

        var isZooming = endZoomVector.k != t.k;

        var xIsLocked = (xLock.attr('locked') == 1);
        var yIsLocked = (yLock.attr('locked') == 1);

        t.x = xIsLocked && !isZooming ? endZoomVector.x : t.x;
        t.y = yIsLocked && !isZooming ? endZoomVector.y : t.y;

        var xt = t.rescaleX(x);
        var yt = t.rescaleY(y);

        if (isZooming) {
            graph.select('.axis--x').call(xAxis.scale(xt));
            graph.select('.axis--y').call(yAxis.scale(yt));
        }


        var line = d3.line()
            .x(function (d) {
                return xt(d.Time);
            })
            .y(function (d) {
                return yt(d.RTH);
            })

        graph.selectAll('.line')
            .attr('d', function (d) {
                return line(d.values);
            });


        var makeAnnotations = d3.annotation()
            .notePadding(15)
            .type(d3.annotationBadge)
            .accessors({
                x: d => xt(d.Time),
                y: d => yt(d.RTH)
            })
            .annotations(timeSeriesAnnotationService.getAnnotations())
            .on('subjectclick', annotationClick)


        graph.select('.annotation-group').call(makeAnnotations)


    }

    function lockToggle(lock) {
        var image = lock.select('image');
        var locked = (lock.attr('locked') == 1)
        locked ? image.attr('xlink:href', './assets/img/lock_unlocked.svg') : image.attr('xlink:href', './assets/img/lock_locked.svg')
        locked ? locked = 0 : locked = 1;
        lock.attr('locked', locked);
    }

    function annotationClick(annotation) {
        annotation.subject.descriptionView = !annotation.subject.descriptionView;
        $log.log(annotation);
        createAnnotationText(annotation);
    }

    function createAnnotationText(annotation) {
       
        const type = d3.annotationLabel
        const annotations = [{
            note: {
                label: 'Longer to show text wrapping',
                bgPadding: 200,
                title: 'Annotations'
            },
            nx: annotation._x +20,
            ny: annotation._y - 200,
            x: annotation._x,
            y: annotation._y
        }]
        
        var makeAnnotations = d3.annotation()
            
            .notePadding(15)
            .type(type)
            .annotations(annotations);

            graph.append('g').attr('class','.annotationText-group').call(makeAnnotations)

    }

    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };


}])
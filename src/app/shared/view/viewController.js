app.controller('viewController', ['$scope', '$log', 'runRequestService', function ($scope, $log, runRequestService) {

    // set the dimensions and margins of the graph
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;



    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);


    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var endZoomVector;


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


    getData(['2B497C4DAFF48A9C!160','2B497C4DAFF48A9C!178'])

    function getData(idArray) {
        var getRunPromises = idArray.map(runRequestService.getRun);
        Promise.all(getRunPromises).then(function (result) {
            var results = [];
            for (var i = 0, n = result.length; i < n; i++) {
                var resultArray = dataObjectToArray(result[i].data.runData);
                results.push({id:1, values: resultArray});
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
            d3.min(runsData, function(c){return d3.min(c.values,function(d){return d.Time})}),
            d3.max(runsData, function(c){return d3.max(c.values, function(d) {return d.Time})})
        ];
        x.domain(d3.extent(xDomain));
        

        y.domain([
            d3.min(runsData, function (c) { return d3.min(c.values, function (d) { return d.RTH; }); }),
            d3.max(runsData, function (c) { return d3.max(c.values, function (d) { return d.RTH; }); })
        ]);



        graph.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        graph.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))


        var runs = graph.selectAll(".run")
            .data(runsData)
            .enter().append("g")
            .attr("class", "run");

        runs.append("path")
            .attr("class", "line")
            .attr("d", function (d) { return line(d.values); })
    }

    function zoomed() {
        var t = d3.event.transform;
        $log.log(t);
        var xIsLocked = (xLock.attr('locked') == 1);
        var yIsLocked = (yLock.attr('locked') == 1);

        if (xIsLocked) {
            if (endZoomVector != undefined) {
                t.x = endZoomVector.x;

            } else {
                t.x = 0;
            }
        }

        if (yIsLocked) {
            if (endZoomVector != undefined) {
                t.y = endZoomVector.y
            } else {
                t.y = 0;
            }
        }

        var xt = t.rescaleX(x);
        var yt = t.rescaleY(y);

        //graph.select('.axis--x').call(xAxis.scale(xt));
        //graph.select('.axis--y').call(yAxis.scale(yt));

        var line = d3.line()
            .x(function (d) {
                return xt(d.Time);
            })
            .y(function (d) {
                return yt(d.RTH);
            })

        svg.selectAll('.line')
            .attr('d', function (d) {
                return line(d.values);
            });

    }

    function lockToggle(lock) {
        var image = lock.select('image');
        var locked = (lock.attr('locked') == 1)
        locked ? image.attr('xlink:href', './assets/img/lock_unlocked.svg') : image.attr('xlink:href', './assets/img/lock_locked.svg')
        locked ? locked = 0 : locked = 1;
        lock.attr('locked', locked);
    }














}])
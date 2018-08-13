app.controller('viewController', ['$scope', '$log', 'runRequestService', function ($scope, $log, runRequestService) {

    /* // set the dimensions and margins of the graph
    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;



    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var z = d3.scaleOrdinal(d3.schemeCategory10);

    var endZoomVector;


    var line = d3.line()
        .x(function (d) { $log.log(d); return x(d.Time); })
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


    getData(['2B497C4DAFF48A9C!160'])

    function getData(idArray) {
        var getRunPromises = idArray.map(runRequestService.getRun);
        Promise.all(getRunPromises).then(function (result) {
            var results = [{ Time: 0, RTH: 20 }, { Time: 100, RTH: 50 }];
            for (var i = 0, n = result.length; i < n; i++) {
                var resultArray = dataObjectToArray(result[i].data.runData);
                //results.push(resultArray);
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



    function drawGraph(runs) {
        $log.log(runs);

        var run1 = {
            id: 'City1',
            values: [
                { time: '20111001', RTH: '0' },
                { time: '20111002', RTH: '10' }
            ]
        }

        runs = [run1]
        $log.log(runs);
        // Scale the range of the data
        var xDomain = [0,100];
        x.domain(d3.extent(xDomain));


        y.domain([
            d3.min(runs, function (c) { return d3.min(c.values, function (d) { return d.RTH; }); }),
            d3.max(runs, function (c) { return d3.max(c.values, function (d) { return d.RTH; }); })
        ]);


        var run = graph.selectAll(".city")
            .data(runs)
            .enter().append("g")
            .attr("class", "city");

        run.append("path")
            .attr("class", "line")
            .attr("d", function (d) { $log.log(d.values); return line(d.values); })

        // Add the X Axis
        graph.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        graph.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));
    }

    function zoomed() {
        var t = d3.event.transform;
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

        d3.select('.line').attr('d', valueline.x(function (d) {
            return xt(d.Time)
        }))
        d3.select('g').select('.axis--x').call(d3.axisBottom(x).scale(xt));

        d3.select('.l1').attr('d', valueline.y(function (d) {
            return yt(d.RTH)
        }))

        d3.select('g').select('.axis--y').call(d3.axisLeft(y).scale(yt));

    }

    function lockToggle(lock) {
        var image = lock.select('image');
        var locked = (lock.attr('locked') == 1)
        locked ? image.attr('xlink:href', './assets/img/lock_unlocked.svg') : image.attr('xlink:href', './assets/img/lock_locked.svg')
        locked ? locked = 0 : locked = 1;
        lock.attr('locked', locked);
    }
 */

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


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

    var x = d3.scaleLinear().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        z = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line()
        .x(function (d) { return x(d.time); })
        .y(function (d) { return y(d.RTH); });

    var zoom = d3.zoom()
        .on('zoom', zoomed)
        .on('end', function () {
            var t = d3.event.transform;
            endZoomVector = t;
        })

    svg.call(zoom)

    drawGraph();
    function drawGraph(runs) {
        var run1 = {
            id: 'City1',
            values: [
                { time: 10, RTH: 0 },
                { time: 20, RTH: 10 }
            ]
        }

        runs = [run1]
        $log.log(runs);
        var xDomain = [0, 100];
        x.domain(d3.extent(xDomain));

        y.domain([
            d3.min(runs, function (c) { return d3.min(c.values, function (d) { return d.RTH; }); }),
            d3.max(runs, function (c) { return d3.max(c.values, function (d) { return d.RTH; }); })
        ]);

        z.domain(runs.map(function (c) { return c.id; }));




        // Add the X Axis
        graph.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        graph.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        var run = graph.selectAll(".run")
            .data(runs)
            .enter().append("g")
            .attr("class", "run");

        run.append("path")
            .attr("class", "line")
            .attr("d", function (d) { $log.log(d.values); return line(d.values); })
            .style("stroke", function (d) { return z(d.id); });

    }

    function lockToggle(lock) {
        var image = lock.select('image');
        var locked = (lock.attr('locked') == 1)
        locked ? image.attr('xlink:href', './assets/img/lock_unlocked.svg') : image.attr('xlink:href', './assets/img/lock_locked.svg')
        locked ? locked = 0 : locked = 1;
        lock.attr('locked', locked);
    }

    function zoomed() {
        var t = d3.event.transform;
        
        var xt = t.rescaleX(x);
        var yt = t.rescaleY(y);

        d3.select('svg').select('.graph').select('.run').select('.line').attr('d',line.x(function(d){
            $log.log(d.time);
        }));
        //d3.select('g').select('.axis--x').call(d3.axisBottom(x).scale(xt));

       
    }











}])
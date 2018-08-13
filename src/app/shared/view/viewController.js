app.controller('viewController', ['$scope', '$log', function ($scope, $log) {
    // set the dimensions and margins of the graph
    var margin = {
            top: 50,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%s");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function (d) {
            return x(d.Time);
        })
        .y(function (d) {
            return y(d.rth);
        });

    var zoom = d3.zoom()
        .on('zoom', zoomed);


    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.select('svg').call(zoom);

    d3.select('svg').append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    var yLock = true;
    d3.select('svg').append("circle")
        .attr("cx", 30)
        .attr("cy", 30)
        .attr("r", 10)
        .attr("transform", "translate(" + (0) + "," + (-20) + ")")
        .on('click', function () {
            yLock = !yLock;
        });
    $log.log(svg);
    // Get the data
    d3.csv("Temperature_Log.csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d['Time'] = Number(d['Time']) * 100;
            d['T(Cell1)'] = Number(d['T(Cell1)']);
            d['T(Environment)'] = Number(d['T(Environment)']);
            var rth = (d['T(Copper)'] - d['T(Cell1)']) / d['T(Environment)'];
            d['rth'] = rth;
        });
        $log.log(data);

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.Time;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.rth;
        })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        svg.call(zoom)
    })

    function zoomed() {
        var t = d3.event.transform;
        var xt = t.rescaleX(x);
        var yt = t.rescaleY(y);
        d3.select('.line').attr('d', valueline.x(function (d) {
            return xt(d.Time)
        }))
        d3.select('g').select('.axis--x').call(d3.axisBottom(x).scale(xt));

        if (yLock) {
            d3.select('.line').attr('d', valueline.y(function (d) {
                return yt(d.rth)
            }))

            d3.select('g').select('.axis--y').call(d3.axisLeft(y).scale(yt))
        }

    }





}])
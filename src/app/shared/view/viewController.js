app.controller('viewController', ['$scope', '$log', function ($scope, $log) {




  
        var svg = d3.select("svg"),
            margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var parseDate = d3.timeParse("%b %Y");

        var x = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]);

        var xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y);

        var zoom = d3.zoom()
            .scaleExtent([-10, 32])
            .on("zoom", zoomed);

        var area = d3.area()
            .curve(d3.curveMonotoneX)
            .x(function (d) { return x(d.date); })
            .y0(height)
            .y1(function (d) { return y(d.price); });

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("sp500.csv", type, function (error, data) {
            if (error){
                $log.log(error);
            }

            x.domain(d3.extent(data, function (d) { return d.date; }));
            y.domain([0, d3.max(data, function (d) { return d.price; })]);

            g.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            g.append("g")
                .attr("class", "axis axis--y")
                .call(yAxis);

            var d0 = new Date(2003, 0, 1),
                d1 = new Date(2004, 0, 1);

            // Gratuitous intro zoom!
            svg.call(zoom)
        });

    

    

    function zoomed() {
        var t = d3.event.transform, xt = t.rescaleX(x);
        g.select(".area").attr("d", area.x(function (d) { return xt(d.date); }));
        g.select(".axis--x").call(xAxis.scale(xt));
    }

    function type(d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
        return d;
    }



}])
function init() {
    function lineChart(data) {
        var w = 900;
        var h = 450;
        var padding = 60;
        //define x y scale
        xScale = d3
            .scaleTime()
            .domain([
                d3.min(dataset, function (d) {
                    return d.date;
                }),
                d3.max(dataset, function (d) {
                    return d.date;
                }),
            ])
            .range([padding, w - padding * 2]);
        yScale = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(dataset, function (d) {
                    return d.number;
                }),
            ])
            .range([h - padding, padding]);
        // x and y axis add
        var xAxis = d3.axisBottom().scale(xScale);
        var yAxis = d3.axisLeft().scale(yScale);
        var area = d3
            .area()
            .x(function (d) {
                return xScale(d.date);
            })
            .y0(function (d) {
                return yScale.range()[0];
            })
            .y1(function (d) {
                return yScale(d.number);
            });;
        //define svg
        var svg = d3
            .select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
        svg.append("path").datum(dataset).attr("class", "path").attr("d", area);
        svg
            .append("g")
            .attr("transform", "translate( 0," + (h - padding) + ")")
            .call(xAxis);

        svg
            .append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);
        svg.append("line")
            .attr("class", "halfLine")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w - padding * 2)
            .attr("y2", yScale(500000))
        //append text half line
        svg.append("text")
            .attr("class", "halfLine")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
    }
    var rowConverter = function (d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number,
        };
    };

    d3.csv("Unemployment_78-95.csv", rowConverter).then(function (data) {
        dataset = data;
        lineChart(dataset);
    });
}

window.onload = init;

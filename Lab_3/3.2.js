var w = 800;
var h = 500;
var padding = 30;
var dataset = [[10, 20],[480, 90],[250, 50],[100, 33],[330, 95],[410, 12],[475, 44],[25, 67],[85, 21],[220, 88]];
// Create xScale and yScale
var xScale = d3.scaleLinear()
                 .domain([0,
                 d3.max(dataset, function(d){
                     return d[0];
                 })])
                 .range([padding , w - padding]);
var yScale = d3.scaleLinear()
                 .domain([0,
                 d3.max(dataset, function(d){
                     return d[1];
                 })])
                 .range([h - padding, padding]);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Create circles
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d, i) {
        return xScale(d[0]);
    })
    .attr("cy", function(d) {
        return yScale(d[1]);
    })
    .attr("r", 4)
    .attr("fill", function(d) {
        if (d[0] == 0) {
            return "white";
        } else {
            return d3.interpolateRainbow(Math.random());
        }
    });
// Add value labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d[0] + "," + d[1];
    })
    .attr("x", function(d) {
        return xScale(d[0]);
    })
    .attr("y", function(d) {
        return yScale(d[1]) - 10;
    })
    .attr("font-size", "11px")
    .attr("fill", function(d) {
        if (d[0] == 0) {
            return "white";
        } else {
            return d3.interpolateRainbow(Math.random());
        }
    });
// Create xAxis variables and yAxis variables

var xAxis = d3.axisBottom().ticks(5).scale(xScale);
var yAxis = d3.axisLeft().ticks(10).scale(yScale);
// Append it to the svgs
svg.append("g").attr("transform", "translate(0, " + (h - padding) + ")").call(xAxis);
svg.append("g").attr("transform", "translate(" + (padding) + ", 0)").call(yAxis);
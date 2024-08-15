function init() {
    var w = 600;
    var h = 600;
    //define dataset
    var dataset = [5, 10, 20, 45, 6, 25];
    var outerRadius = w / 2;
    var innerRadius = 0;
    //define arc
    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    var pie = d3.pie();
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    //append to svg
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
    //append path
    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", arc)
        .append("title")
        .text((d, i) => color(i) + " and this is the number of data " + d.data);
    
    //append text
    arcs.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.value;
        });
}
window.onload = init;
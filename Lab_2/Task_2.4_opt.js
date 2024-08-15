function init() {
    d3.csv("2.4_opt.csv").then(function(data){
        console.log(data);
        wombatSightings  = data;
        barChart1(wombatSightings);
        barChart2(wombatSightings);
       });
       //Function for the 2019 year
       function barChart1(wombatSightings){
        var w = 500;
        var h = 200;
        var _barpadding = 1;
        var svg = d3.select("#chart1")
                   .append("svg")
                   .attr("width",w)
                   .attr("height",h);
        svg.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            .attr("x", function(d, i){
                return i * (w/wombatSightings.length);
            })
            .attr("y", function(d){
                return h - (d.pets2019 * 4) - 30;
            })
            .attr("width", function(d){
                return (w/wombatSightings.length) - _barpadding;
            })
            .attr("height", function(d){
                return d.pets2019 * 4; 
            })
            .attr("fill",function(d){
                return "rgb(0, 0, " + Math.round(d.pets2019 * 10) + ")";
            })
        //Labels
        svg.selectAll("text")
            .data(wombatSightings)
            .enter()
            .append("text")
            .text(function(d){
                return d.animal;
            })
            .attr("x", function(d, i){
                return i * (w/wombatSightings.length) + 5;
            })
            .attr("y", 190)
            .style("fill", "green"); 
       };
       //Function for the 2021 year
       function barChart2(wombatSightings){
        var w = 500;
        var h = 200;
        var _barpadding = 1;
        var svg = d3.select("#chart2")
                   .append("svg")
                   .attr("width",w)
                   .attr("height",h);
        svg.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            .attr("x", function(d, i){
                return i * (w/wombatSightings.length);
            })
            .attr("y", function(d){
                return h - (d.pets2021 * 4) - 30;
            })
            .attr("width", function(d){
                return (w/wombatSightings.length) - _barpadding;
            })
            .attr("height", function(d){
                return d.pets2021 * 4; 
            })
            .attr("fill",function(d){
                return "rgb(0, 0, " + Math.round(d.pets2021 * 10) + ")";
            })
        //Labels
        svg.selectAll("text")
            .data(wombatSightings)
            .enter()
            .append("text")
            .text(function(d){
                return d.animal;
            })
            .attr("x", function(d, i){
                return i * (w/wombatSightings.length) + 5;
            })
            .attr("y", 190)
            .style("fill", "green"); 
       };
}
window.onload = init;
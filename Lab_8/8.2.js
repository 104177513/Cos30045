function init() {
  let w = 500;
  let h = 300;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey");

  var projection = d3
    .geoMercator()
    .center([145, -36.5])
    .translate([w / 2, h / 2])
    .scale(2450);

  let path = d3.geoPath().projection(projection);

  var color = d3
    .scaleQuantize()
    .range(["rgb(237,248,233)", "rgb(186,228,179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);

  d3.csv("VIC_LGA_unemployment.csv").then(function (data) {
    color.domain([
      d3.min(data, function (d) {
        return d.unemployed;
      }),
      d3.max(data, function (d) {
        return d.unemployed;
      }),
    ]);

    return data;
  }).then(function (data) {
    d3.json("LGA_VIC.json").then(function (json) {
      //Merge the ag. data and GeoJSON
      //Loop through once for each ag. data value
      for (var i = 0; i < data.length; i++) {
        //Grab state name
        var dataState = data[i].LGA;
        //Grab data value, and convert from string to float
        var dataValue = parseFloat(data[i].unemployed);
        //Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.LGA_name;
          if (dataState == jsonState) {
            //Copy the data value into the JSON
            json.features[j].properties.value = dataValue;
            //Stop looking through the JSON
            break;
          }
        }
      }
      svg
        .selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function (d) {
          //Get data value
          var value = d.properties.value;
          if (value) {
            //If value exists…
            return color(value);
          } else {
            //If value is undefined…
            return "#ccc";
          }
        });
        d3.csv("VIC_city.csv").then (function (data) {
          const enter = svg
            .selectAll("circle")
            .data(data)
            .enter();
            console.log(enter);
            enter
            .append("circle")
            .attr("cx", function (d) {
              return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function (d) {
              return projection([d.lon, d.lat])[1];
            })
            .attr("r", 1)
            .style("fill", "yellow")
            .style("stroke", "gray")
            .style("stroke-width", 0.25)
            .style("opacity", 0.75)
            .append("title") //Simple tooltip
        });
    });
  });
}

window.onload = init;

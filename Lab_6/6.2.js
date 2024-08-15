var maxValue = 25;
var w = 800;
var h = 300;
var _barpadding = 1;
var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);
  // .attr("stroke","pink")
  // .style("border","solid");

var xScale = d3
  .scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);
var yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);
//add from dataset
svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return h - yScale(d);
  })
  .attr("width", xScale.bandwidth())
  .attr("height", function (d) {
    return yScale(d);
  })
  .attr("fill", function (d) {
      return "rgb(0, 0, " + Math.round(d * 10) + ")";
    })
  //mouse over mouse out effects to show texts
  .on("mouseover", function (event, d) {
    d3.select(this).transition("highlight").attr("fill", "orange");
    var xPosition =
      parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2 - 5;
    var yPosition = parseFloat(d3.select(this).attr("y")) + 15;
    svg
      .append("text")
      .attr("id", "tooltip")
      .attr("x", xPosition)
      .attr("y", yPosition)
      .text(d);
  })
  .on("mouseout", function () {
    d3.select(this).transition("highlight").attr("fill", "blue");
    d3.select("#tooltip").remove();
  });
//add button
d3.select("#button_add").on("click", function () {
  var newNumber = Math.floor(Math.random() * maxValue);
  dataset.push(newNumber);
  xScale.domain(d3.range(dataset.length));
  var bars = svg.selectAll("rect").data(dataset);
  bars
    .enter()
    .append("rect")
    .attr("x", w)
    .attr("y", function (d) {
      return h - yScale(d);
    })
    .merge(bars)
    .on("mouseover", function (event, d) {
      d3.select(this).transition("highlight").attr("fill", "orange");
      var xPosition =
        parseFloat(d3.select(this).attr("x")) +
        xScale.bandwidth() / 2 -
        5;
      var yPosition = parseFloat(d3.select(this).attr("y")) + 15;
      svg
        .append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .text(d);
    })
    .on("mouseout", function () {
      d3.select(this).transition("highlight").attr("fill", "blue");
      d3.select("#tooltip").remove();
    })
    .transition()
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("fill", function (d) {
      return "rgb(0, 0, " + Math.round(d * 10) + ")";
    });
});
//remove button
d3.select("#button_remove").on("click", function () {
  dataset.pop();
  // dataset.shift();
  xScale.domain(
    dataset.map(function (d, i) {
      return i;
    })
  );
  var bars = svg.selectAll("rect").data(dataset);
  bars.exit().transition().duration(500).attr("x", w).remove();
  svg
    .selectAll("rect")
    .data(dataset)
    .transition()
    .duration(500)
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("fill", function (d) {
      return "rgb(0, 0, " + Math.round(d * 10) + ")";
    });
});

d3.select("#button_remove2").on("click", function () {
  // dataset.pop();
  dataset.shift();
  xScale.domain(
    dataset.map(function (d, i) {
      return i;
    })
  );
  var bars = svg.selectAll("rect").data(dataset);
  bars.exit().transition().duration(500).attr("x", w).remove();
  svg
    .selectAll("rect")
    .data(dataset)
    .transition()
    .duration(500)
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr("x", function (d, i) {
      return xScale(i);
    })
    .attr("y", function (d) {
      return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("fill", function (d) {
      return "rgb(0, 0, " + Math.round(d * 10) + ")";
    });
});

//sorting logics
d3.select("#sort").on("click", function () {
  sortBars();
});

// Variable to keep track of the sorting order
let sortingOrder = false;

// Function to sort the bars
let sortBars = function () {
  // Change the value of sortingOrder
  sortingOrder = !sortingOrder;
  // Sort the data
  svg
    .selectAll("rect")
    .sort(function (a, b) {
      if (sortingOrder) {
        dataset.sort(d3.ascending);
        return d3.ascending(a, b);
      } else {
        dataset.sort(d3.descending);
        return d3.descending(a, b);
      }
    })
    .transition("sort")
    .delay(function (d, i) {
      return i * 50;
    })
    .duration(500)
    .attr("x", function (d, i) {
      return xScale(i);
    });
};
var maxValue = 25;
        var w = 800;
        var h = 300;
        var _barpadding = 1;
        var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
        // Create an SVG element and set its width and height
        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        var xScale = d3.scaleBand().domain(d3.range(dataset.length)).rangeRound([0, w]).paddingInner(0.05);
        var yScale = d3.scaleLinear().domain([0, d3.max(dataset)]).range([0, h]);

        // Bind data to rectangles, set attributes based on data values
        svg.selectAll("rect")
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
            .attr("fill", "blue");

        d3.select("#button_add").on("click", function () {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);
            xScale.domain(d3.range(dataset.length));
            var bars = svg.selectAll("rect")
                .data(dataset)
            bars.enter()
                .append("rect")
                .attr("x", w)
                .attr("y", function (d) {
                    return h - yScale(d);
                })
                .merge(bars)
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
            // svg.selectAll("rect")
            //     .data(dataset)
            //     .transition()
            //     .delay(function (d, i) {
            //         return i * 100;
            //     })
            //     .duration(500)
            //     .transition()
            //     .duration(1000)
            //     .ease(d3.easeLinear)
            //     .attr("y", function (d) {
            //         return h - yScale(d);
            //     })
            //     .attr("height", function (d) {
            //         return yScale(d);
            //     })
            //     .attr("fill", function (d) {
            //         return "rgb(0, 0, " + Math.round(d * 10) + ")";
            //     });
        });

        d3.select("#button_remove").on("click", function () {
            // var newNumber = Math.floor(Math.random() * maxValue);
            // dataset.push(newNumber);
            // xScale.domain(d3.range(dataset.length));
            // var bars = svg.selectAll("rect")
            //     .data(dataset)
            // bars.enter()
            //     .append("rect")
            //     .attr("x", w)
            //     .attr("y", function (d) {
            //         return h - yScale(d);
            //     })
            //     .merge(bars)
            //     .transition()
            //     .duration(500)
            //     .attr("x", function (d, i) {
            //         return xScale(i);
            //     })
            //     .attr("y", function (d) {
            //         return h - yScale(d);
            //     })
            //     .attr("width", xScale.bandwidth())
            //     .attr("height", function (d) {
            //         return yScale(d);
            //     })
            //     .attr("fill", function (d) {
            //         return "rgb(0, 0, " + Math.round(d * 10) + ")";
            //     });
            dataset.shift();
            var bars = svg.selectAll("rect")
                .data(dataset);
            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove();
            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .duration(500)
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .attr("y", function (d) {
                    return h - yScale(d);
                })
                .attr("height", function (d) {
                    return yScale(d);
                })
                .attr("fill", function (d) {
                    return "rgb(0, 0, " + Math.round(d * 10) + ")";
                });
        });
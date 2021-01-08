"use strict";
var svgWidth = 900;
var svgHeight = 500;
var padding = 38;
var rectWidth = 5;
var container = d3.select("#svg-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("x", 0)
    .attr("y", 0);
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", {
    mode: "cors",
    method: "GET"
})
    .then(function (data) {
    var xScale = d3.scaleTime()
        .domain([d3.min(data, function (d) {
            console.log(d);
        })]);
});

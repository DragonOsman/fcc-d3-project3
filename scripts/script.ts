"use strict";

const svgWidth:number = 900;
const svgHeight:number = 500;
const padding:number = 38;
const rectWidth:number = 5;
const container = d3.select("#svg-container")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("x", 0)
  .attr("y", 0)
;

d3.json<JSON>("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", {
  mode: "cors",
  method: "GET"
})
  .then((data: object) => {
    
  })
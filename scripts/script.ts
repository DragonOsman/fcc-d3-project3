"use strict";

d3.json<JSON>("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", {
  mode: "cors",
  method: "GET"
})
  .then((data: any) => {
    const svgWidth:number = 900;
    const svgHeight:number = 500;
    const padding:number = 38;
    const rectWidth:number = 5;
    
    const tooltip = d3.select("#tooltip");
    tooltip.style("opacity", 0);

    const container = d3.select("#svg-container")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("x", 0)
      .attr("y", 0)
    ;
    
    const xScale = d3.scaleBand()
      .domain(data.monthlyVariance.map(elem => elem.year))
      .rangeRound([padding, svgWidth - padding])
    ;
    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(year => {
      // set ticks to years divisible by 10
      return year % 10 === 0;
    })).tickFormat(year => {
      const date = new Date(0);
      date.setFullYear(year);
      return d3.timeFormat("%Y")(date);
    }).tickSize(10, 1);

    const yScale = d3.scaleBand()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      .rangeRound([svgHeight - padding, padding])
    ;
    const yAxis = d3.axisLeft(yScale).tickValues(yScale.domain()).tickFormat(month => {
      const date = new Date(0);
      date.setMonth(month);
      return d3.timeFormat("%B")(date);
    }).tickSize(10, 1);

    container.append("g")
      .attr("transform", `translate(0, ${svgHeight - padding})`)
      .attr("id", "x-axis")
      .call(xAxis)
    ;

    container.append("g")
      .attr("transform", `translate(${padding}, 0)`)
      .attr("id", "y-axis")
      .call(yAxis)
    ;
  })
;
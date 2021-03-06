"use strict";
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", {
    mode: "cors",
    method: "GET"
})
    .then((data) => {
    const svgWidth = 900 * (data.monthlyVariance[8].year).toString().length + 5;
    const svgHeight = 500;
    const padding = 70;
    d3.select("main")
        .append("h1")
        .attr("id", "title")
        .text("DragonOsman Global Temperature Heatmap");
    d3.select("main")
        .append("h3")
        .attr("id", "description")
        .html(`${data.monthlyVariance[0].year} - ${data.monthlyVariance[data.monthlyVariance.length - 1].year}: base temperature ${data.baseTemperature}&#8451;`);
    const container = d3.select("main")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("id", "svg-container")
        .attr("class", "container")
        .attr("x", 0)
        .attr("y", 0);
    const tooltip = d3.select("main")
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .style("opacity", 0);
    const xScale = d3.scaleBand()
        .domain(data.monthlyVariance.map(elem => elem.year))
        .range([padding, svgWidth - padding]);
    const xAxis = d3.axisBottom(xScale)
        .tickValues(xScale.domain()
        .filter(year => {
        // set ticks to years divisible by 10
        return year % 10 === 0;
    })).tickFormat(year => {
        const date = new Date(0);
        date.setFullYear(year);
        return d3.timeFormat("%Y")(date);
    });
    const yScale = d3.scaleBand()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        .range([svgHeight - padding, padding]);
    const yAxis = d3.axisLeft(yScale)
        .tickValues(yScale.domain())
        .tickFormat(month => {
        const date = new Date(0);
        date.setMonth(month);
        return d3.timeFormat("%B")(date);
    });
    container.append("g")
        .attr("transform", `translate(0, ${svgHeight - padding})`)
        .attr("id", "x-axis")
        .call(xAxis)
        .append("text")
        .style("text-anchor", "start")
        .attr("x", "400")
        .attr("y", "40")
        .text("Years")
        .style("fill", "white");
    container.append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .attr("id", "y-axis")
        .call(yAxis)
        .append("text")
        .style("text-anchor", "end")
        .attr("x", "-50")
        .attr("y", "250")
        .text("Months")
        .style("fill", "white")
        .attr("transform", `translate(-300, ${padding + 100}) rotate(-90)`);
    const colors = {
        RdYlBu: {
            3: ["#fc8d59", "#ffffbf", "#91bfdb"],
            4: ["#d7191c", "#fdae61", "#abd9e9", "#2c7bb6"],
            5: ["#d7191c", "#fdae61", "#ffffbf", "#abd9e9", "#2c7bb6"],
            6: ["#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4"],
            7: [
                "#d73027",
                "#fc8d59",
                "#fee090",
                "#ffffbf",
                "#e0f3f8",
                "#91bfdb",
                "#4575b4"
            ],
            8: [
                "#d73027",
                "#f46d43",
                "#fdae61",
                "#fee090",
                "#e0f3f8",
                "#abd9e9",
                "#74add1",
                "#4575b4"
            ],
            9: [
                "#d73027",
                "#f46d43",
                "#fdae61",
                "#fee090",
                "#ffffbf",
                "#e0f3f8",
                "#abd9e9",
                "#74add1",
                "#4575b4"
            ],
            10: [
                "#a50026",
                "#d73027",
                "#f46d43",
                "#fdae61",
                "#fee090",
                "#e0f3f8",
                "#abd9e9",
                "#74add1",
                "#4575b4",
                "#313695"
            ],
            11: [
                "#a50026",
                "#d73027",
                "#f46d43",
                "#fdae61",
                "#fee090",
                "#ffffbf",
                "#e0f3f8",
                "#abd9e9",
                "#74add1",
                "#4575b4",
                "#313695"
            ]
        },
        RdBu: {
            3: ["#ef8a62", "#f7f7f7", "#67a9cf"],
            4: ["#ca0020", "#f4a582", "#92c5de", "#0571b0"],
            5: ["#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0"],
            6: ["#b2182b", "#ef8a62", "#fddbc7", "#d1e5f0", "#67a9cf", "#2166ac"],
            7: [
                "#b2182b",
                "#ef8a62",
                "#fddbc7",
                "#f7f7f7",
                "#d1e5f0",
                "#67a9cf",
                "#2166ac"
            ],
            8: [
                "#b2182b",
                "#d6604d",
                "#f4a582",
                "#fddbc7",
                "#d1e5f0",
                "#92c5de",
                "#4393c3",
                "#2166ac"
            ],
            9: [
                "#b2182b",
                "#d6604d",
                "#f4a582",
                "#fddbc7",
                "#f7f7f7",
                "#d1e5f0",
                "#92c5de",
                "#4393c3",
                "#2166ac"
            ],
            10: [
                "#67001f",
                "#b2182b",
                "#d6604d",
                "#f4a582",
                "#fddbc7",
                "#d1e5f0",
                "#92c5de",
                "#4393c3",
                "#2166ac",
                "#053061"
            ],
            11: [
                "#67001f",
                "#b2182b",
                "#d6604d",
                "#f4a582",
                "#fddbc7",
                "#f7f7f7",
                "#d1e5f0",
                "#92c5de",
                "#4393c3",
                "#2166ac",
                "#053061"
            ]
        }
    };
    const legendColors = colors.RdYlBu[11].reverse();
    const legendWidth = 400;
    const legendHeight = 300 / legendColors.length;
    const tempVariance = data.monthlyVariance.map(elem => elem.variance);
    const minTemp = data.baseTemperature + Math.min.apply(null, tempVariance);
    const maxTemp = data.baseTemperature + Math.max.apply(null, tempVariance);
    const legendThreshold = d3.scaleThreshold()
        .domain(((min, max, count) => {
        const array = [];
        const step = (max - min) / count;
        const base = min;
        for (let i = 1; i < count; i++) {
            array.push(base + i * step);
        }
        return array;
    })(minTemp, maxTemp, legendColors.length))
        .range(legendColors);
    const legendXScale = d3.scaleLinear()
        .domain([minTemp, maxTemp])
        .range([padding, legendWidth - padding]);
    const legendXAxis = d3.axisBottom(legendXScale)
        .tickValues(legendThreshold.domain())
        .tickFormat(d3.format(".1f"));
    const legend = container.append("g")
        .attr("id", "legend")
        .attr("transform", `translate(${padding + (padding * 2)}, ${(svgHeight - padding)})`);
    legend.append("g")
        .selectAll("rect")
        .data(legendThreshold.range().map(color => {
        const d = legendThreshold.invertExtent(color);
        if (d[0] === null) {
            d[0] = legendXScale.domain()[0];
        }
        if (d[1] === null) {
            d[1] = legendXScale.domain()[1];
        }
        return d;
    }))
        .enter()
        .append("rect")
        .style("fill", (d) => legendThreshold(d[0]))
        .attr("x", (d) => legendXScale(d[0]) + ((padding + padding + padding + 100)))
        .attr("y", legendHeight - 1)
        .attr("width", (d) => (legendXScale(d[1]) - legendXScale(d[0])) + 1)
        .attr("height", legendHeight);
    legend
        .append("g")
        .attr("transform", `translate(${(padding - 60) + 300}, ${legendHeight + (legendHeight - 1)})`)
        .call(legendXAxis);
    container.append("g")
        .selectAll("rect")
        .data(data.monthlyVariance)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", (d) => d.month - 1)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => data.baseTemperature + d.variance)
        .attr("x", (d) => xScale(d.year) + 1)
        .attr("y", (d) => yScale(d.month - 1))
        .attr("width", (d) => xScale.bandwidth(d.year))
        .attr("height", (d) => yScale.bandwidth(d.month - 1))
        .style("fill", (d) => legendThreshold(data.baseTemperature + d.variance))
        .on("mouseover", (event, d) => {
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.9)
            .attr("height", "auto")
            .attr("width", "100px");
        const date = new Date(d.year, d.month - 1);
        tooltip.html(`${d3.timeFormat("%Y - %B")(date)}
          <br />${d3.format(".1f")(data.baseTemperature + d.variance)}&#8451;
          <br />${d3.format(".1f")(d.variance)}&#8451;`)
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 28}px`)
            .style("transform", "translateX(2px)")
            .attr("data-year", d.year);
    })
        .on("mouseout", () => {
        tooltip.transition()
            .duration(200)
            .style("opacity", 0);
    });
});

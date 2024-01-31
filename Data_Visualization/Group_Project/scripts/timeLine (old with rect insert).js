var div = d3.select("body").append("div")	
	.attr("class", "tooltip")				
	.style("opacity", 0)
	.style("padding", "0.0em")
	.style("border", 0);

//console.log();

var w = (document.getElementById("timeLine").offsetWidth - getScrollBarWidth()); // Set graph width
var h = w / 4; // set graph height (keeping the graoh square)
					
var svg = d3.select("#timeLine").append("svg")
.attr("width", w)
.attr("height", h)
.style("padding", "0.0em")
.style("border", 0);

// Draw graph background
svg.append("rect")
	.style("fill", "#aaaaaa")
	.attr("height", h)
	.attr("width", w)
	.attr("x", 0)
	.attr("y", 0)
	.style("padding", "0.0em")
	.style("border", 0);



// Import the data from the CSV file
d3.csv("source/timeLineData.csv", function(data){
	var now = new Date();

	var maxYear = now.getFullYear();
	var minYear = now.getFullYear();
	
	data.forEach(function(d)
	{
		// If the maxYear year is null or smaller than the new year
		if (!maxYear || (maxYear < d.Year))
		{
			maxYear = +d.Year; // Update maxYear
		}
		
		// If the minYear year is null or larger than the new year
		if (!minYear || (minYear > d.Year))
		{
			minYear = +d.Year; // Update minYear
		}
	});


	var rangeYear = (maxYear - minYear);
	var rangePadYear = (rangeYear * 0.02);

	var padding = (h / 9); // Set container padding to a given percentage of total size

	// Eduation on x axis scale
	var xScale = d3.scaleLinear()
		.domain([(minYear - rangePadYear), (maxYear + rangePadYear)]) // data min max
		.range([padding, w - padding]); // view port min max

	// Create xAxis object
	var xAxis = d3.axisBottom(xScale);

	// Generate X visual scale
	svg.append("g")
		.attr("class", "axis")
		.attr("id", "xAxis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);
		
	// Add line to indicate current date
	svg.append("rect")
			.style("fill", "#0000ff")
			.attr("height", h)
			.attr("width", (w / 300))
			.attr("x", xScale(now.getFullYear()) - ((w / 300) / 2))
			.attr("y", 0);

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.style("fill", "yellow")
		.attr("cx", function(d){
				return xScale(+d.Year);
			})
		.attr("cy", (h / 2))
		.attr("r", (h / 80))
		.attr("display", true)
		.attr("xlink:href", "https://developer.mozilla.org/en-US/docs/SVG")
		//.attr("xmls:xlink", "http://www.google.com")
		//.attr("xlink:href", "http://en.wikipedia.org/wiki/")
		.on("mouseover", function(d){
			 div.transition()
				.duration(100)
				.style("opacity", 1);
			 div.html
			 (d.HoverDescription)
				.style("left", (d3.event.pageX) + "px")		
				.style("top", (d3.event.pageY - 10) + "px").attr("xlink:href", d.URL);//.append("a").attr("xlink:href", d.URL);
			})
		.on("mouseout", function(d) {
			 div.transition()
				.duration(200)
				.style("opacity", 0);
		})
		.on("click", function(d) {
			 div.transition()
				.duration(200)
				.style("opacity", 0);

		window.location.href = d.URL;
		
		var holder = d3.select("body")
			.append("svg")
			.attr("width", 200)
			.attr("height", 100);

		// draw a rectangle
		holder.append("a")
			.attr("xlink:href", d.URL)
			.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 200)
			.attr("height", 100)
			.style("fill", "lightgreen")
			.attr("rx", 10)
			.attr("ry", 10);
				
		});
});
//.attr("a", xlink:href="https://developer.mozilla.org/en-US/docs/SVG")







var timeLineDiv = d3.select("body").append("div")	
	.attr("class", "tooltip")				
	.style("opacity", 0)
	.style("padding", "0.0em")
	.style("border", 0);

var w = (document.getElementById("timeLine").clientWidth - getScrollBarWidth()); // Set graph width
var h = w / 4; // set graph height (keeping the graoh square)

var svg = d3.select("#timeLine").append("svg")
	.attr("width", w)
	.attr("height", h)
	.style("padding", "0.0em")
	.style("border", 0);

// Draw graph background
svg.append("rect")
	.style("fill", "#cccccc")
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
	
	var numberOfRows = 6;
	var elementPos = 0;

	data.forEach(function(d)
	{
		// Work out the space between rows (including the top and bottom of graph which will always be empty)
		var rowOffset = (h / (numberOfRows + 2));
		
		// Work out how many rows out from the center to move the point and multiply by the row height
		var posOffset = (rowOffset * Math.ceil(elementPos / 2));
		
		// if ElementPos is even offset up, else offset down
		if(elementPos % 2)
		{
			// invert posOffset value
			posOffset = -posOffset;
		}

		d.yPos = posOffset;
		
		// Iterate for next variable
		elementPos = ((elementPos + 1) % numberOfRows);
		
		
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

	var pointRadius = (h / 40);

	// X axis scale
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
		
	// Add line to indicate the year this graph was created
	svg.append("rect")
			.style("fill", "#ff8080")
			.attr("height", h)
			.attr("width", (w / 300))
			.attr("x", xScale(2017) - ((w / 300) / 2))
			.attr("y", 0)
			.on("mouseover", function(){
				div.transition()
					.duration(100)
					.style("opacity", 1);
				div.html("The calendar year this graph was compiled: " + 2017)
					.style("left", tooltipPos(d3.event.pageX, div._groups[0][0].clientWidth, w))
					.style("top", (d3.event.pageY + 15) + "px");
			})
			.on("mouseout", function(d) {
				div.transition()
					.duration(200)
					.style("opacity", 0);
			});
		
	// Add line to indicate current date
	svg.append("rect")
			.style("fill", "#ff0000")
			.attr("height", h)
			.attr("width", (w / 300))
			.attr("x", xScale(now.getFullYear()) - ((w / 300) / 2))
			.attr("y", 0)
			.on("mouseover", function(){
				timeLineDiv.transition()
					.duration(100)
					.style("opacity", 1);
				timeLineDiv.html("The current calendar year: " + now.getFullYear())
					.style("left", tooltipPos(d3.event.pageX, timeLineDiv._groups[0][0].clientWidth, w))
					.style("top", (d3.event.pageY + 15) + "px");
			})
			.on("mouseout", function(d) {
				timeLineDiv.transition()
					.duration(200)
					.style("opacity", 0);
			});
			
	// Place Label
	svg.append("text")
		.attr("class", "axisLabel")
		.attr("id", "yLabel")
		.attr("text-anchor", "middle")
		.attr("x", 155)
		.attr("y", 25)
		.attr("font-size", (h / 15))
		.attr("fill", "#000000")
		.text("Timeline of milestones and predictions");

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.style("fill", "#0d4c7a00")
		.style("stroke", "#348eff")
		.style("stroke-width", 3)
		.attr("cx", function(d){
				return (xScale(+d.Year) - pointRadius);
			})
		.attr("cy", function(d){
				return ((h / 2) + d.yPos);
			})
		.attr("r", pointRadius)
		.attr("display", true)
		.attr("cursor", "pointer") // change the mouse to a pointer to show that the circle is clickable
		.on("mouseover", function(d){
			timeLineDiv.transition()
				.duration(100)
				.style("opacity", 1);
			timeLineDiv.html(d.HoverDescription)
				.style("left", tooltipPos(d3.event.pageX, timeLineDiv._groups[0][0].clientWidth, w))
				.style("top", (d3.event.pageY + 15) + "px");
			})
		.on("mouseout", function(d) {
			timeLineDiv.transition()
				.duration(200)
				.style("opacity", 0);
		})
		.on("click", function(d) {
			timeLineDiv.transition()
				.duration(200)
				.style("opacity", 0);

			window.location.href = d.URL;	
		});
});







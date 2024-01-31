

//var scaleW = (document.getElementById("scale").clientWidth - getScrollBarWidth()); // Set graph scaleWidth
//var scaleH = scaleW / 4;

var scaleW = 0;
var scaleH = 0;

var svg2 = d3.select("#scale").append("svg")
	.attr("width", scaleW)
	.attr("height", scaleH)
	.style("padding", "0.0em")
	.style("border", 0);

// DrascaleW grapscaleH background
svg2.append("rect")
	.style("fill", "#000")
	.attr("height", scaleH)
	.attr("width", scaleW)
	.attr("x", 0)
	.attr("y", 0)
	.style("padding", "0.0em")
	.style("border", 0);

var g1 = svg2.append("g")
	.append("rect")
		.attr("height", 100)
		.attr("width", 100)
		.attr("x", 0)
		.attr("y", 0)
		.attr("fill", "yellow");
		
	g1.append("rect")
		.attr("height", 100)
		.attr("width", 100)
		.attr("x", 300)
		.attr("y", 0)
		.attr("fill", "yellow");
	/*	
<g fill="green" opacity="0.5" transform="matrix(1,0,0,1,60,60)">
  	<rect x="0" y="15" scaleWidtscaleH="111" scaleHeigscaleHt="111"></rect>
    <text x="0" y="35" fill="blue">I love SVG!</text>
</g>*/
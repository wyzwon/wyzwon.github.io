// Global scope functions
		
"use strict";

// returns mouse position in local coordinate system of element
function getMouse(e){
	var mouse = {} // make an object
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - e.target.offsetTop;
	return mouse;
}

function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
}


function makeColor(red, green, blue, alpha){
	var color='rgba('+red+','+green+','+blue+', '+alpha+')';
	return color;
}


// Code credit: Alexandre Gomes on his blog: http://www.alexandre-gomes.com/?p=115
// Returns the width of the scroll bar
function getScrollBarWidth(){
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild (inner);
	
	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;
	
	document.body.removeChild (outer);
	
	return (w1 - w2);
}



// calculate tooltip Position
function tooltipPos(pointDistance, tooltipWidth, w){

	let halvedTooltipWidth = (tooltipWidth / 2);
	let leftWallPadded = 10;
	let rightWallPadded = (w - leftWallPadded);
	
	// Prevent tooltip overflowing the sides of the window
	if(pointDistance < (halvedTooltipWidth + leftWallPadded))
	{
		// Force tooltip right
		return (leftWallPadded + "px");
	}
	else if((pointDistance + halvedTooltipWidth) > rightWallPadded)
	{
		// Force tooltip left
		return ((rightWallPadded - tooltipWidth) + "px");
	}
	else
	{
		// position tooltip centered on the point
		return ((pointDistance - halvedTooltipWidth) + "px");
	}
}



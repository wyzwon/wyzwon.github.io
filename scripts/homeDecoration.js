'use strict';
window.onload = init;

function init()
{
	let canvas = document.querySelector('#mainCanvas');
	let ctx = canvas.getContext('2d');
	ctx.strokeStyle = "blue";
	ctx.fillStyle = "blue";
	
	// get Canvas size (old hard code: (600,300))
	let width = canvas.width;
	let height = canvas.height;
	
	// Set circle limits
	let maxCircleWidth = 40;
	let minCircleWidth = 10;
	
	
	for(let i = 0; i < getRandomArbitrary(5, 12); i++)
	{
		ctx.globalAlpha = 1.0 - (i * 0.1);
		let x = getRandomArbitrary(0, width);
		let y;
		
		// Avoid writing over text area
		if(x > 240)
		{
			y = getRandomArbitrary(0, height);
		}
		else
		{
			y = getRandomArbitrary(100, height);
		}
		
		let size = getRandomArbitrary(minCircleWidth, maxCircleWidth);
		
		//draw full circle
		ctx.arc(x, y, size, 0, 2 * Math.PI);
		
		//ctx.arc(x, y, size, 0, 2 * Math.PI);
		ctx.fillStyle = "white"; //"black"
		ctx.fill();
		
		//draw invisible circle to change the stroke exit position
		ctx.globalAlpha = 0.0;//make it invisible
		ctx.arc(x, y, size, 0, getRandomArbitrary(0, (2 * Math.PI)), true);
		ctx.globalAlpha = 1.0 - (i * 0.1);//return its visibility
		
		ctx.stroke();
	}
	
	ctx.globalAlpha = 1.0;
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";
	ctx.font = "20px Helvetica, sans-serif";
	
	// Write text in upper left corner
	ctx.strokeText("Thomas Bouffard", 30, 60);
	ctx.strokeText("Portfolio of", 30, 30);
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
	
	
/*
function HighlightedImg(element) {
	element.setAttribute('src', '../SourceImages/City_insception(small).jpg');
}

function normalImg(element) {
	element.setAttribute('src', '../SourceImages/basicShapesSmall.png');
}*/
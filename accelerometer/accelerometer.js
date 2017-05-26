// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic accelerometer example logs a stream
of x, y, and z data from the accelerometer
*********************************************/

var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['B']);

// Initialize the accelerometer.
accel.on('ready', function () {
// Stream accelerometer data
accel.on('data', function (xyz) {
  console.log('x:', xyz[0].toFixed(2),
    'y:', xyz[1].toFixed(2),
    'z:', xyz[2].toFixed(2));
  orientation(xyz[0], xyz[1], xyz[2]);
});

});

accel.on('error', function(err){
  console.log('Error:', err);
});

function orientation (x, y, z) {
	//right-side up x:-0, y: +0, z: +1
	//upside down x:0 y:0 z:-1
	x = Math.round(x);
	y = Math.round(y);
	z = Math.round(z);
	if ( x === 0 && y === 0 && z === 1 ) {
		console.log("Right-side up");
	}
	else if (x === 0 && y === 0 && z === -1) {
		console.log("Upside down");
	}
	else if (x === 1 && y === 0 && z === 0) {
		console.log("Turned right");
	}
	else if (x === -1 && y === 0 && z === 0) {
		console.log("Turned left");
	}
	else if (x === 0 && y === 1 && z === 0) {
		console.log("Turned away");
	}
	else if (x === 0 && y === -1 && z === 0) {
		console.log("Turned towards");
	}
	else 
		console.log("Unknown");
 }

// function round (num) {
// 	if (num > 0) {
// 		return Math.floor(num);
// 	}
// 	else {
// 		if ( num > -0.5) {
// 			return Math.ceil(num);
// 		}
// 		else
// 			return Math.floor(num);
// 	}
// }
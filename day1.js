const fs = require("fs");

function getDepthValuesFromFile(filename) {
  //TODO: refactor to us async file read
  return fs.readFileSync(filename).toString("utf-8").split("\n");
}

const depthsArray = getDepthValuesFromFile("depth_readings.txt");

console.log(depthsArray);
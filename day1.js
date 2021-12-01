const fs = require("fs");

async function getDepthValuesFromFile(filename) {
  //TODO: refactor to us async file read
  try {
    const string = await fs.promises.readFile(filename, "utf-8");
    return string.split("\n");
  } catch(error) {
    throw new Error(error.message);
  }
}

async function countIncreasese() {
  const depths = await getDepthValuesFromFile("depth_readings.txt");
  //create a store (variable) to keep track of the count
  let count = 0;
  
  //loop through the array
  let previousDepth = 0;
  for(let i = 0; i < depths.length; i++) {
    if(i === 0) {
      previousDepth = depths[i];
      continue;
    }
    //count each time the current number is higher than the previous number.
    if(depths[i] > previousDepth) {
      count += 1;
    }
  
    //assign current reading to previousDepth
    previousDepth = depths[i];
  }
  
  //output count
  console.log('count', count);
}

countIncreasese();

const fs = require("fs");

async function getDepthValuesFromFile(filename) {
  try {
    const string = await fs.promises.readFile(filename, "utf-8");
    return string.split("\n").map(string => Number(string));
  } catch(error) {
    throw new Error(error.message);
  }
}

async function countIncreaseseByOne() {
  const depths = await getDepthValuesFromFile("depth_readings.txt");

  //convert to numbers
  //create a store (variable) to keep track of the count
  let count = 0;
  
  //loop through the array
  for(let i = 0; i < depths.length; i++) {
    //count each time the current number is higher than the previous number.
    if(depths[i] > depths[i - 1]) {
      count++;
    }
  }
  
  //output count
  console.log('count', count);
}

countIncreaseseByOne();

async function countIncreaseseBySlidingWindow(windowSize = 3) {
  
}
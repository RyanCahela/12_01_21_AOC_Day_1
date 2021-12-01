const fs = require("fs");

async function getDepthValuesFromFile(filename) {
  try {
    const string = await fs.promises.readFile(filename, "utf-8");
    const numbers = string.split("\n").map(string => Number(string));
    return numbers;
  } catch(error) {
    throw new Error(error.message);
  }
}

async function countIncreaseseByOne() {
  const depths = await getDepthValuesFromFile("depth_readings.txt");

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
  const depths = getDepthValuesFromFile("depth_readings.txt");




}

countIncreaseseBySlidingWindow(3);
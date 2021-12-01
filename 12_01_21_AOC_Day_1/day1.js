const fs = require("fs");

async function getDepthValuesFromFile(filename) {
  try {
    const string = await fs.promises.readFile(filename, "utf-8");
    return string.split("\n");
  } catch(error) {
    throw new Error(error.message);
  }
}

async function countIncreasese() {
  const inputStrings = await getDepthValuesFromFile("depth_readings.txt");

  //convert to numbers
  const depths = inputStrings.map(string => Number(string));
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

countIncreasese();
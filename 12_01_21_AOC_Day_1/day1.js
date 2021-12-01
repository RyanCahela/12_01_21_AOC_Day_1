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


//part 1
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
  console.log('part 1 count', count);
}

countIncreaseseByOne();

//part 2
async function countIncreaseseBySlidingWindow(windowSize = 3) {
  const depths = await getDepthValuesFromFile("depth_readings.txt");

  //create variable to store count
  let count = 0;

  //create varable to store previous window sum
  let previousWindowSum = 0;

  //compare current window sum to previous sum
  for(let i = 0; i < depths.length - windowSize; i++) {
    let currentSum = depths.slice(i, i + windowSize).reduce((acc, num) => acc + num, 0);
    
    if(currentSum > previousWindowSum) {
      //if current window sum larger than previous sum increase count
      count++;
    }
    
    
    //assign current sum to previous window sum
    previousWindowSum = currentSum;
  }

  console.log("part 2 count", count);
}

countIncreaseseBySlidingWindow(3);
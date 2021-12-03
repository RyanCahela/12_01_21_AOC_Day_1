const { count } = require('console');
const fs = require('fs');

async function getInputFromFile(filename) {
  const data = await fs.promises.readFile(filename, "utf-8");
  return data.split("\n");
}

//part 1
async function getGammaAndEpsilonRate() {
  const input = await getInputFromFile(process.argv[2]);

  //create two hash tables to store the count of each binary number by index in the string
  const {
    zeroCount,
    oneCount,
  } = countZerosAndOnes(input);

  //compare the tables by digit index position
  let gammaRate = "";
  for(let i = 0; i < Object.keys(zeroCount).length ; i++) {
    //highest count for a position is gamma rate
    if(zeroCount[i] > oneCount[i]) {
      gammaRate += "0";
    } else {
      gammaRate += "1";
    }
  }

  let epsilonRate = "";
  for(let i = 0; i < Object.keys(zeroCount).length; i++) {
    //lowest count for a position is epsilon rate
    if(zeroCount[i] > oneCount[i]) {
      epsilonRate += "1";
    } else {
      epsilonRate += "0";
    }
  }

  const gammaRateDecimal = parseInt(gammaRate, 2);
  const epsilonRateDecimal = parseInt(epsilonRate, 2);

  // console.log("power consumption", gammaRateDecimal * epsilonRateDecimal);
  return {
    gammaRate,
    epsilonRate
  }
}


function countZerosAndOnes(input) {
  //iterate over each string and store the count in the zero count table and the one count table
  let oneCount = input.reduce((acc, binaryString) => {
    const binaryChars = binaryString.split("");

    for(let index in binaryChars) {
      //initialize count if number at index doesn't exist
      if( binaryChars[index] === "1" ) {
        //initalize count if it doesn't exist
        if(!acc[index]) {
          acc[index] = 1;
        } else {
          //increment count
          acc[index] += 1;
        }
      } 
    };

    return acc;
  }, {});

  let zeroCount = input.reduce((acc, binaryString) => {
    const binaryChars = binaryString.split("");

    for (let index in binaryChars) {
      if(binaryChars[index] === "0") {
        if(!acc[index]) {
          acc[index] = 1;
        } else {
          acc[index] += 1;
        }
      }
    }

    return acc;
  }, {})

  return {
    zeroCount,
    oneCount
  }
}

getGammaAndEpsilonRate();

//part 2
async function getOxygenAndCO2Rating() {
  const input = await getInputFromFile(process.argv[2]);


  function findOxygenMatch(numbers, positionInReading) {
    console.log(`numbers ${positionInReading}`, numbers);
    //define a base case.
    if(numbers.length === 1) {
      return numbers[0];
    }
    const {
      zeroCount,
      oneCount
    } = countZerosAndOnes(numbers);

    //determin larger count for given position
    let largerCount = "";
    if(oneCount[positionInReading] >= zeroCount[positionInReading]) {
      largerCount = "1";
    } else {
      largerCount = "0";
    }

    //identify the recursive case
    return findOxygenMatch(numbers.filter((string, index) => { 
      return string[positionInReading] === largerCount;
    }), positionInReading + 1);
  }

  function findCO2Match(numbers, positionInReading) {
    if (numbers.length === 1) {
      return numbers[0];
    }

    const {
      zeroCount,
      oneCount
    } = countZerosAndOnes(numbers);

    let smallerCount = ""
    if(oneCount[positionInReading] >= zeroCount[positionInReading]) {
      smallerCount = "0";
    } else {
      smallerCount = "1";
    }

    return findCO2Match(numbers.filter((string, index) => {
      return string[positionInReading] === smallerCount;
    }), positionInReading + 1);
  }

  const oxygenReading = findOxygenMatch(input, 0);
  const co2Reading = findCO2Match(input, 0);
  console.log("oxygenReading", oxygenReading);
  console.log("co2Reading", co2Reading);
  console.log("life support rating", parseInt(oxygenReading, 2) * parseInt(co2Reading, 2));
// 00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010
}

getOxygenAndCO2Rating();
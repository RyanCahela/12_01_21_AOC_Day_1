const fs = require('fs');

async function getInputFromFile(filename) {
  const data = await fs.promises.readFile(filename, "utf-8");
  return data.split("\n");
}

//part 1
async function getGammaAndEpsilonRate() {
  const input = await getInputFromFile(process.argv[2]);

  //create two hash tables to store the count of each binary number by index in the string

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

  console.log("oneCount", oneCount);

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

  console.log("zeroCount", zeroCount);
  console.log("oneCount", oneCount);

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

  console.log("power consumption", gammaRateDecimal * epsilonRateDecimal);
  return {
    gammaRate,
    epsilonRate
  }
}

getGammaAndEpsilonRate();

//part 2
async function getOxygenAndCO2Rating() {
  const {
    gammaRate,
    epsilonRate
  } = await getGammaAndEpsilonRate();
  const input = await getInputFromFile(process.argv[2]);


  function findMatch(template, numbers) {
    //define a base case.
    if(numbers.length === 1) {
      return numbers[0];
    }

    //identify the recursive case
    return findMatch(template, numbers.filter((string, index) => { 

    }));
  }

  const oxygenReading = findMatch(gammaRate, input);
  console.log("oxygenReading", oxygenReading);



}

getOxygenAndCO2Rating();
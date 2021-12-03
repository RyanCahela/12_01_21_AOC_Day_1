const fs = require('fs');
const arguments = process.argv;

async function getInputFromFile(filename) {
  const data = await fs.promises.readFile(filename, "utf-8");
  return data.split("\n");
}

async function getGammaRate() {
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
  


  //compare the tables by digit index position 

  //highest count for a position is gamma rate

  //lowest count for a position is epsilon rate
}

getGammaRate();
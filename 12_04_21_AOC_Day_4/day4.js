const fs = require('fs');


async function getInputFromFile(filename) {
  const input = await fs.promises.readFile(filename, "utf-8");
  // console.log("input", input.split("\n"));
  const drawnNumbers = input.split("\n", 1)[0].split(",");
  const gameBoards = input.split(/\n\n/);
  // .filter((value, index) => {
  //   if(index > 0) return true;
  //   return false;
  // });

  console.log("gameBoards", gameBoards); 
}

getInputFromFile(process.argv[2]);
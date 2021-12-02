const fs = require('fs');

async function getInputFromFile(filename) {
  const data = await fs.promises.readFile(filename, "utf-8");
  const array = data.split("\n");
  return array;
}

async function calculatePosition() {
  const commands = await getInputFromFile("input.txt");

  let currentDepth = 0;
  let currentForward = 0;

  for(let i = 0; i < commands.length; i++) {
    //split each command into a direction and a value
    let [direction, amount] = commands[i].split(" ");
    amount = Number(amount);
    switch(direction) {
      case "up":
        // code block
        currentDepth -= amount;
        break;
      case "down":
        // code block
        currentDepth += amount;
        break;
      case "forward":
        // code block
        currentForward += amount;
        break;
      default:
        // code block
        console.error(`unexpected value for direction: ${direction}`)
    }
  }

  console.log("currentDepth", currentDepth);
  console.log("currentForward", currentForward);
  console.log("mulitplied", currentDepth * currentForward);
}

calculatePosition();



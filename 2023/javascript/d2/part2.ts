import { readFile } from "fs";
import { getGameStatistics } from "./part1";

readFile("./input.md", "utf-8", (e, data) => {
  if (e) {
    console.log(e);
  } else {
    const rows = data.split("\n");
    let sum = 0;
    for (const r of rows) {
      if (r === "") continue;
      sum += calcPowerOfRow(r);
    }
    console.log(`Total sum of the powers is: ${sum}`);
  }
});

function calcPowerOfRow(r: string) {
  const rounds = getGameStatistics(r);

  let maxBlue = 0;
  let maxRed = 0;
  let maxGreen = 0;

  for (const round of rounds) {
    maxBlue = maxBlue > round.blue ? maxBlue : round.blue;
    maxRed = maxRed > round.red ? maxRed : round.red;
    maxGreen = maxGreen > round.green ? maxGreen : round.green;
  }

  return maxBlue * maxRed * maxGreen;
}

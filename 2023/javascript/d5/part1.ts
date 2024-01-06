import { readFile } from "fs";
import chalk from "chalk";

const flag = "--verbose";

type Range = {
  destRangeStart: number;
  srcRangeStart: number;
  length: number;
};

class AlmanacMap {
  from: string;
  to: string;
  ranges: Range[] = [];

  constructor(title: string) {
    const res = /(.*)-to-(.*) map:/.exec(title);
    this.from = res ? res[1] : "";
    this.to = res ? res[2] : "";
  }

  addRange(drs: number, srs: number, length: number) {
    this.ranges.push({
      destRangeStart: drs,
      srcRangeStart: srs,
      length: length,
    });
  }

  mapValue(v: number) {
    for (const r of this.ranges) {
      if (v >= r.srcRangeStart && v < r.srcRangeStart + r.length) {
        const delta = v - r.srcRangeStart;
        return r.destRangeStart + delta;
      }
    }
    return v;
  }
}

function parseText(data: string): [seeds: number[], maps: AlmanacMap[]] {
  const rows = data.split("\n");

  const seeds = rows[0]
    .split(": ")[1]
    .split(" ")
    .map((n) => parseInt(n));

  const maps: AlmanacMap[] = [];
  for (let i = 2; i < rows.length; i++) {
    const a = new AlmanacMap(rows[i]);
    i++;

    while (rows[i] != "") {
      const [d, s, l] = rows[i].split(" ").map((n) => parseInt(n));
      a.addRange(d, s, l);
      i++;
    }
    maps.push(a);
  }

  return [seeds, maps];
}

readFile("./input.txt", "utf-8", (e, data) => {
  const [seeds, maps] = parseText(data);
  let min = Infinity;

  for (const seed of seeds) {
    let curCategoryValue = seed;
    for (const map of maps) {
      const mappedValue = map.mapValue(curCategoryValue);
      if (process.argv.includes(flag)) {
        console.log(
          `${chalk.yellow.bold(map.from)} number ${chalk.blue(
            curCategoryValue,
          )} corresponds to ${chalk.yellow.bold(map.to)} number ${chalk.blue(
            mappedValue,
          )}`,
        );
      }

      curCategoryValue = mappedValue;
    }
    const location = curCategoryValue;

    if (process.argv.includes(flag)) {
      console.log(
        `from seed ${seed} we got location: ${chalk.green.bold(location)}`,
      );
      console.log("--------------------------");
    }
    min = location < min ? location : min;
  }
  console.log(`minimum location is ${min}`);
});

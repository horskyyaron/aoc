import { readFile } from "fs";

interface Card {
  index: number;
  winningNumbers: number[];
  myNumbers: number[];
}

function parseData(data: string): Card[] {
  const rows = data.split("\n");
  const cards: Card[] = [];
  for (const r of rows) {
    const res = /^Card (.*): (.*) \| (.*$)/.exec(r);

    if (res) {
      cards.push({
        index: parseInt(res[1]),
        winningNumbers: res[2]
          .replace(/\s+/g, "-")
          .split("-")
          .map((n) => parseInt(n))
          .filter((n) => !isNaN(n)),

        myNumbers: res[3]
          .replace(/\s+/g, "-")
          .split("-")
          .map((n) => parseInt(n))
          .filter((n) => !isNaN(n)),
      });
    }
  }
  return cards;
}

readFile("./input.txt", "utf-8", (e, data) => {
  const cards = parseData(data);
  let points = 0;
  for (const c of cards) {
    const intersection = c.myNumbers.filter((n) =>
      c.winningNumbers.includes(n),
    );
    if (intersection.length == 0) continue;
    points += 2 ** (intersection.length - 1);
  }
  console.log("total points from all cards: ", points);
});

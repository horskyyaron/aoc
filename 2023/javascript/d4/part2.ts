import { readFile } from "fs";

interface Card {
  index: number;
  winningNumbers: number[];
  myNumbers: number[];
  copies: number;
}

/**
 * parsing the game rows to a more convenient form
 *
 * @param {string} data - the string that describe all of the games.
 * @returns {Card[]} the processed form of that data.
 */
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
        copies: 1,
      });
    }
  }
  return cards;
}

readFile("./input.txt", "utf-8", (e, data) => {
  const cards = parseData(data);
  let totalCardsCopies = 0;

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const intersection = c.myNumbers.filter((n) =>
      c.winningNumbers.includes(n),
    );

    for (let j = 1; j <= intersection.length; j++) {
      cards[i + j].copies += c.copies;
    }
  }
  for (const c of cards) {
    // console.log(`card ${c.index} has ${c.copies} copies`);
    totalCardsCopies += c.copies;
  }
  console.log(`total cards copies: ${totalCardsCopies}`);
});

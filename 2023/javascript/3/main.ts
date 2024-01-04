import { readFile } from "node:fs";

type Constraints = {
  MAX_RED: number;
  MAX_BLUE: number;
  MAX_GREEN: number;
};

readFile("./input.md", "utf-8", (e, data) => {
  if (e) {
    console.log(e);
  } else {
    const res = calcTot(data.split("\n"));
    console.log(res);
  }
});

function calcTot(rows: string[]): number {
  let sum = 0;
  for (const r of rows) {
    sum += isGamePossibleUnderConstraints(r, {
      MAX_GREEN: 13,
      MAX_BLUE: 14,
      MAX_RED: 12,
    });
  }
  return sum;
}

type SetColors = {
  blue: number;
  green: number;
  red: number;
};

/**
 * parsing the game information string into a string array, each cell describes the i-th set
 *
 *
 * @param {string} str - game information string
 * @returns {string[]} the game sets, each set contain how many balls, of which color were presented
 */
function parseGameRounds(str: string): string[] {
  //removing the Game i: .... at the beggening
  let s = str.slice(str.indexOf(":") + 2);
  // converting into a nicer form 4 blue, 1 red; 3 red; 1 green -> 4b,1r;3r;1g
  s = s
    .replace(/blue/g, "-b")
    .replace(/red/g, "-r")
    .replace(/green/g, "-g")
    .replace(/ /g, "");
  const sets = s.split(";");
  return sets;
}

/**
 * parsing the game statistics.
 *
 * @param {string} str - game information string
 * @returns {SetColors[]} SetColor array, each SetColor hold the results for each round in the game.
 */
function getGameStatistics(str: string): SetColors[] {
  const rounds = parseGameRounds(str);
  let game: SetColors[] = [];
  for (const r of rounds) {
    let sc: SetColors = {
      blue: 0,
      green: 0,
      red: 0,
    };
    let roundColors = r.split(",");

    for (const colorString of roundColors) {
      //color string is of the form value-color
      const [v, c] = colorString.split("-");

      if (c === "r") sc.red = parseInt(v);
      if (c === "g") sc.green = parseInt(v);
      if (c === "b") sc.blue = parseInt(v);
    }
    game.push(sc);
  }
  return game;
}

/**
 * checks if the game results holds up to given contstraints.
 * if at any one of the game sets, the number of balls of color X
 * is larger than the constraint given for that color, this is an impossible game.
 *
 * @param {string} gameString - [game information string]
 * @param {Constraints} c - [max balls for each color]
 * @returns {number} [return 0 for an impossible game, otherwise, return the game id]
 */
function isGamePossibleUnderConstraints(
  gameString: string,
  c: Constraints,
): number {
  let match = /Game (\d+):/.exec(gameString);
  if (match) {
    //match[1] holds the value in the () in the regex match from the string.
    const gameId = parseInt(match[1]);
    const game = getGameStatistics(gameString);

    for (const round of game) {
      if (
        round.red > c.MAX_RED ||
        round.blue > c.MAX_BLUE ||
        round.green > c.MAX_GREEN
      )
        return 0;
    }
    return gameId;
  }
  return 0;
}

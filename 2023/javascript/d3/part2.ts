import { readFile } from "fs";

class Matrix {
  //private
  values: string[][];
  isUsedMatrix: boolean[][];
  ROWS: number;
  COLS: number;

  constructor(data: string) {
    const rows = data.split("\n");
    let temp: string[][] = [];
    let mat: boolean[][] = [];
    for (const r of rows) {
      if (r === "") continue;
      let row = r.split("");
      let bools: boolean[] = new Array(row.length).fill(false);
      temp.push(row);
      mat.push(bools);
    }
    this.values = temp;
    this.isUsedMatrix = mat;
    this.ROWS = this.values.length;
    this.COLS = this.values[0].length;
  }

  getCell(i: number, j: number) {
    return this.values[i][j];
  }

  /**
   * check neighbors for numbers, sum all of the numbers found, and updates the
   * boolean state matrix.
   * when number is found, it checks if already counted in earlier operation using the isUsedMatrix
   *
   * @param {number} i - [row number]
   * @param {number} j - [col number]
   * @returns {number} [sum of all neighbors number which are discovered for the firs time]
   */
  getGearRatio(i: number, j: number): number {
    const symbolCell = this.getCell(i, j);
    let sum = 1;
    let neighors = 0;
    let numberIndexs: NumberIndex[] = [];

    // check up
    if (!(i - 1 == -1) && !this.isUsedMatrix[i - 1][j]) {
      const upCell = this.getCell(i - 1, j);
      if (isDigit(upCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i - 1, j);
        numberIndexs.push({ row: i - 1, lmd: lmd, rmd: rmd });

        sum *= res;
        neighors++;
      }
    }

    // check down
    if (!(i + 1 == this.ROWS) && !this.isUsedMatrix[i + 1][j]) {
      const downCell = this.getCell(i + 1, j);
      if (isDigit(downCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i + 1, j);
        numberIndexs.push({ row: i + 1, lmd: lmd, rmd: rmd });

        sum *= res;
        neighors++;
      }
    }

    // check right
    if (!(j + 1 == this.COLS) && !this.isUsedMatrix[i][j + 1]) {
      const rightCell = this.getCell(i, j + 1);
      if (isDigit(rightCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i, j + 1);
        numberIndexs.push({ row: i, lmd: lmd, rmd: rmd });

        sum *= res;
        neighors++;
      }
    }

    // check left
    if (!(j - 1 == -1) && !this.isUsedMatrix[i][j - 1]) {
      const leftCell = this.getCell(i, j - 1);
      if (isDigit(leftCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i, j - 1);
        numberIndexs.push({ row: i, lmd: lmd, rmd: rmd });
        sum *= res;
        neighors++;
      }
    }

    // check up-right
    if (
      !(j + 1 == this.COLS) &&
      !(i - 1 == -1) &&
      !this.isUsedMatrix[i - 1][j + 1]
    ) {
      const upRightCell = this.getCell(i - 1, j + 1);

      if (isDigit(upRightCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i - 1, j + 1);
        numberIndexs.push({ row: i - 1, lmd: lmd, rmd: rmd });

        sum *= res;

        neighors++;
      }
    }

    // check down-right
    if (
      !(j + 1 == this.COLS) &&
      !(i + 1 == this.ROWS) &&
      !this.isUsedMatrix[i + 1][j + 1]
    ) {
      const downRightCell = this.getCell(i + 1, j + 1);

      if (isDigit(downRightCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i + 1, j + 1);
        numberIndexs.push({ row: i + 1, lmd: lmd, rmd: rmd });
        sum *= res;
        neighors++;
      }
    }

    // check up-left
    if (!(j - 1 == -1) && !(i - 1 == -1) && !this.isUsedMatrix[i - 1][j - 1]) {
      const upLeftCell = this.getCell(i - 1, j - 1);

      if (isDigit(upLeftCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i - 1, j - 1);
        numberIndexs.push({ row: i - 1, lmd: lmd, rmd: rmd });

        sum *= res;

        neighors++;
      }
    }

    // check down-left
    if (
      !(j - 1 == -1) &&
      !(i + 1 == this.ROWS) &&
      !this.isUsedMatrix[i + 1][j - 1]
    ) {
      const downLeftCell = this.getCell(i + 1, j - 1);

      if (isDigit(downLeftCell)) {
        const [res, lmd, rmd] = this.getFullNumberFromCell(i + 1, j - 1);
        numberIndexs.push({ row: i + 1, lmd: lmd, rmd: rmd });

        sum *= res;

        neighors++;
      }
    }

    if (neighors != 2) {
      return 0;
    }
    return sum;
  }
  getFullNumberFromCell(i: number, j: number): number[] {
    //left most digit
    let lmd = j;
    let lDone = false;
    let rmd = j;
    let rDone = false;
    while (!lDone || !rDone) {
      if (lmd - 1 >= 0 && isDigit(this.values[i][lmd - 1])) {
        lmd = lmd - 1;
      } else {
        lDone = true;
      }
      if (rmd + 1 < this.COLS && isDigit(this.values[i][rmd + 1])) {
        rmd = rmd + 1;
      } else {
        rDone = true;
      }
    }
    let num = parseInt(this.values[i][lmd]);
    this.isUsedMatrix[i][lmd] = true;
    for (let k = lmd + 1; k <= rmd; k++) {
      this.isUsedMatrix[i][k] = true;
      num = num * 10 + parseInt(this.values[i][k]);
    }

    return [num, lmd, rmd];
  }
}

function isDigit(c: string): boolean {
  return /\d/.test(c);
}

interface NumberIndex {
  row: number;
  lmd: number;
  rmd: number;
}

readFile("./input.txt", "utf-8", (e, data) => {
  const m = new Matrix(data);
  const rows = m.values.length;
  const cols = m.values[0].length;
  let sum = 0;

  for (const r of m.values) {
    console.log(r.join(""));
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let c = m.getCell(i, j);
      //check only when char is a special symbol.
      if (c === ".") continue;
      if (isDigit(c)) continue;
      if (m.isUsedMatrix[i][j]) continue;
      //if reached a special symbol, look at the neighors for numbers
      const res = m.getGearRatio(i, j);
      sum += res;
    }
  }

  console.log(
    "Total sum of all numbers which are neighors of a symbol is: ",
    sum,
  );
});

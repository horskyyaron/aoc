import { readFile } from "node:fs";

const DIGITS = {
    ONE: "1",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9",
};

readFile("./input.md", "utf-8", (e, data) => {
    if (e) {
        console.log(e);
        return;
    } else {
        console.log(calcTotCalibration(data.split("\n")));
    }
});

export function calcTotCalibration(rows: string[]): number {
    let sum = 0;
    for (const r of rows) {
        if (r == "") break;
        sum += calcRowCalibration(r);
    }
    return sum;
}

export function calcRowCalibration(str: string): number {
    const tokens = getTokens(str);
    if (tokens.length === 1) {
        return tokens[0] * 10 + tokens[0];
    } else {
        return tokens[0] * 10 + tokens[tokens.length - 1];
    }
}

function getTokens(str: string): number[] {
    const tokens: number[] = [];

    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        switch (c) {
            case "o":
                if (str.substring(i + 1, i + 3) === "ne") {
                    tokens.push(1);
                    i = i + 2 - 1;
                }
                break;

            case "t":
                if (str.substring(i + 1, i + 3) === "wo") {
                    tokens.push(2);
                    i = i + 2 - 1;
                }
                if (str.substring(i + 1, i + 5) === "hree") {
                    tokens.push(3);
                    i = i + 4 - 1;
                }
                break;

            case "f":
                if (str.substring(i + 1, i + 4) === "our") {
                    tokens.push(4);
                    i = i + 3 - 1;
                }
                if (str.substring(i + 1, i + 4) === "ive") {
                    tokens.push(5);
                    i = i + 3 - 1;
                }
                break;

            case "s":
                if (str.substring(i + 1, i + 3) === "ix") {
                    tokens.push(6);
                    i = i + 2 - 1;
                }
                if (str.substring(i + 1, i + 5) === "even") {
                    tokens.push(7);
                    i = i + 4 - 1;
                }
                break;

            case "e":
                if (str.substring(i + 1, i + 5) === "ight") {
                    tokens.push(8);
                    i = i + 4 - 1;
                }
                break;

            case "n":
                if (str.substring(i + 1, i + 4) === "ine") {
                    tokens.push(9);
                    i = i + 3 - 1;
                }
                break;

            case DIGITS.ONE:
            case DIGITS.TWO:
            case DIGITS.THREE:
            case DIGITS.FOUR:
            case DIGITS.FIVE:
            case DIGITS.SIX:
            case DIGITS.SEVEN:
            case DIGITS.EIGHT:
            case DIGITS.NINE:
                tokens.push(parseInt(c));
                break;
            default:
                continue;
        }
    }
    return tokens;
}

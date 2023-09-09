package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

const (
	OPP_ROCK     = "A"
	OPP_PAPER    = "B"
	OPP_SCISSORS = "C"

	ROCK     = "X"
	PAPER    = "Y"
	SCISSORS = "Z"
)

var SHAPE_SCORE = map[string]int{
	ROCK:     1,
	PAPER:    2,
	SCISSORS: 3,
}

func logRound(me string, msg string, opp string, round_score int, shape_score int) {
	fmt.Printf(
		"opp shape %s(%s), my shape %s(%s) - %s\n",
		opp,
		getShapeName(opp),
		me,
		getShapeName(me),
		msg,
	)
	fmt.Printf(
		"round score: %d.\nshape score: %d(%s)\nround score: %d\n",
		shape_score+round_score,
		shape_score,
		getShapeName(me),
		round_score,
	)
}

func calcTotalScore(input *os.File) int {
	tot := 0
	f := bufio.NewScanner(input)
	for f.Scan() {
		chars := strings.Split(f.Text(), " ")
		opp, me := chars[0], chars[1]
		round_score, msg := scoreRound(opp, me)
		shape_score := SHAPE_SCORE[me]
		tot += round_score + shape_score
		logRound(me, msg, opp, round_score, shape_score)
	}
	fmt.Printf("total score: %d\n", tot)

	return tot
}

func getShapeName(shape string) string {
	if shape == ROCK || shape == OPP_ROCK {
		return "ROCK"
	}

	if shape == PAPER || shape == OPP_PAPER {
		return "PAPER"
	}

	if shape == SCISSORS || shape == OPP_SCISSORS {
		return "SCISSORS"
	}

	return ""
}

func scoreRound(oppShape string, myShape string) (int, string) {
	score, msg := 0, "LOST"
	if getShapeName(oppShape) == getShapeName(myShape) {
		score, msg = 3, "DRAW"
	} else {
		if oppShape == OPP_ROCK {
			if myShape == SCISSORS {
				score, msg = 0, "LOST"
			} else {
				score, msg = 6, "WIN"
			}
		}
		if oppShape == OPP_PAPER {
			if myShape == ROCK {
				score, msg = 0, "LOST"
			} else {
				score, msg = 6, "WIN"
			}
		}
		if oppShape == OPP_SCISSORS {
			if myShape == PAPER {
				score, msg = 0, "LOST"
			} else {
				score, msg = 6, "WIN"
			}
		}
	}
	return score, msg
}

func shapeScore(shape string) int {
	switch shape {
	// X - rock, Y - paper and Z - siccors
	case ROCK:
		return 1
	case PAPER:
		return 2
	case SCISSORS:
		return 3
	default:
		return 0
	}
}

func terminateIfError(err error) {
	if err != nil {
		log.Fatal("error in opening file")
	}
}

func main() {
	if len(os.Args) > 1 {
		file, err := os.Open(os.Args[1])
		terminateIfError(err)
		calcTotalScore(file)
	}
	calcTotalScore(os.Stdin)
}

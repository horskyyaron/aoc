package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

const (
	ROCK     = "A"
	PAPER    = "B"
	SCISSORS = "C"

	WIN_SCORE  = 6
	LOSE_SCORE = 0
	DRAW_SCORE = 3
)

var DESIRED_RESULT = map[string]string{
	"X": "LOSE",
	"Y": "DRAW",
	"Z": "WIN",
}

func calcTotalScore(input *os.File) int {
	f := bufio.NewScanner(input)
	tot := 0
	for f.Scan() {
		str := strings.Split(f.Text(), " ")
		opp_shape, desired_result := str[0], str[1]
		round_score := calcRound(opp_shape, desired_result)
		tot += round_score
	}
	return tot
}

//round score = shape score + win/draw/lose score
func calcRound(opp_shape string, desired_result_code string) int {
	desired_round_outcome := DESIRED_RESULT[desired_result_code]
	if opp_shape == ROCK {
		if desired_round_outcome == "WIN" {
			return shapeScore("PAPER") + WIN_SCORE
		} else if desired_round_outcome == "LOSE" {
			return shapeScore("SCISSORS") + LOSE_SCORE
		} else {
			return shapeScore("ROCK") + DRAW_SCORE
		}
	} else if opp_shape == PAPER {
		if desired_round_outcome == "WIN" {
			return shapeScore("SCISSORS") + WIN_SCORE
		} else if desired_round_outcome == "LOSE" {
			return shapeScore("ROCK") + LOSE_SCORE
		} else {
			return shapeScore("PAPER") + DRAW_SCORE
		}
	} else {
		if desired_round_outcome == "WIN" {
			return shapeScore("ROCK") + WIN_SCORE
		} else if desired_round_outcome == "LOSE" {
			return shapeScore("PAPER") + LOSE_SCORE
		} else {
			return shapeScore("SCISSORS") + DRAW_SCORE
		}
	}
}

func shapeScore(shape string) int {
	switch shape {
	// X - rock, Y - paper and Z - siccors
	case "ROCK":
		return 1
	case "PAPER":
		return 2
	case "SCISSORS":
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
		fmt.Printf("total: %d\n", calcTotalScore(file))
	}
	fmt.Printf("total: %d\n", calcTotalScore(os.Stdin))
}

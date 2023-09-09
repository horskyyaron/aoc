package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
)

func sortString(s string) string {
	runes := []rune(s)
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})
	sorted := string(runes)
	return sorted
}

// a and b are sorted strings (by char).
func findSharedItem(a string, b string) byte {
	// var charset [52]byte
	// NOTE: not implemented yet.
	// a faster(?) solution would be to add each c that was alredy checked and not found a "brother" in b,
	// into charset array above, flipping the byte into 1 instead of 0. where a-0 Z-52
	// giving us an O(1) access to check if a character was checked already.
	// plus, a and b are sorted, which allows us to stop early.
	// e.g. looking for a 'd' and when scanning we passed 'd' we can stop and move to the next char.
	for _, c := range a {
		for _, d := range b {
			if c == d {
				return byte(c)
			}
		}
	}

	return 'a'
}

func calcItemsPrioritiesSum(input *os.File) int {
	tot := 0
	f := bufio.NewScanner(input)
	for f.Scan() {
		line := f.Text()
		a, b := line[:len(line)/2], line[len(line)/2:]
		sorted_a := sortString(a)
		sorted_b := sortString(b)

		shared_item := findSharedItem(sorted_a, sorted_b)
		// capital letter
		if int(shared_item) < 97 {
			tot += int(shared_item) - 'A' + 26 + 1
		} else {
			tot += int(shared_item) - 'a' + 1
		}

		fmt.Printf("the shared item is %c\n", shared_item)
		fmt.Println("-----------")

	}

	return tot
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
		res := calcItemsPrioritiesSum(file)
		fmt.Printf("total priorities: %d\n", res)
		return
	}
	res := calcItemsPrioritiesSum(os.Stdin)
	fmt.Printf("total priorities: %d\n", res)
}

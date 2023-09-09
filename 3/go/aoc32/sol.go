package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

// a and b are sorted strings (by char).
func findSharedItem(a string, b string, c string) byte {
	var charset_a [123]byte
	var charset_b [123]byte
	var charset_c [123]byte
	for _, c := range a {
		if charset_a[c] > 0 {
			continue
		} else {
			charset_a[c]++
		}
	}
	for _, c := range b {
		if charset_b[c] > 0 {
			continue
		} else {
			charset_b[c]++
		}
	}
	for _, c := range c {
		if charset_c[c] > 0 {
			continue
		} else {
			charset_c[c]++
		}
	}

	for i := 60; i < len(charset_a); i++ {
		if charset_a[i] == 1 && charset_b[i] == 1 && charset_c[i] == 1 {
			return byte(i)
		}
	}
    return 0
}

func calcItemsPrioritiesSum(input *os.File) int {
	tot := 0
	f := bufio.NewScanner(input)
	for f.Scan(){
		a := f.Text()
		f.Scan()
		b := f.Text()
		f.Scan()
		c := f.Text()

		shared_item := findSharedItem(a, b, c)

        //Scoring according to letter priority
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

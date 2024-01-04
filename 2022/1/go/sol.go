package main

import (
	// "bufio"
	"fmt"
	"log"
	"os"
	// "strconv"
)

func main() {

	log.SetPrefix("ERROR: ")
	log.SetFlags(0)

	stdInfo, err := os.Stdin.Stat()
	if err != nil {
		log.Fatal(err)
	}

	if stdInfo.Size() == 0 {
		fmt.Println("stdin is empty")
	} else {
		fmt.Printf("stdin size %v", stdInfo.Size())
	}

	//scanner := bufio.NewScanner(os.Stdin)

	////opening input file
	//file, err := os.Open("../file")
	//if err != nil {
	//	log.Fatal(err)
	//}

	//scanner = bufio.NewScanner(file)
	//scanner.Split(bufio.ScanLines)

	//max := 1
	//elf_idx := 1
	//counter := 1

	//for scanner.Scan() {
	//	idx := counter
	//	total := 0
	//	num := scanner.Text()
	//	for num != "" {
	//		temp, err := strconv.Atoi(num)
	//		if err != nil {
	//			log.Fatal(err)
	//		}
	//		total += temp
	//		scanner.Scan()
	//		num = scanner.Text()
	//	}
	//	if total > max {
	//		max = total
	//		elf_idx = idx
	//		counter++
	//	}
	//	fmt.Printf("elf %d with %d calories!\n", idx, total)
	//	counter++
	//}

	//fmt.Printf("MVP: elf %d with %d calories!\n", elf_idx, max)
}

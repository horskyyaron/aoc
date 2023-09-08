package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
)

func isStdin() bool {
	stat, _ := os.Stdin.Stat()
	return (stat.Mode() & os.ModeCharDevice) == 0
}

func getDataFromStdin() string {
	data := ""
	nBytes, nChunks := int64(0), int64(0)
	r := bufio.NewReader(os.Stdin)
	buf := make([]byte, 0, 4*1024)

	for {

		n, err := r.Read(buf[:cap(buf)])
		buf = buf[:n]

		if n == 0 {

			if err == nil {
				continue
			}

			if err == io.EOF {
				break
			}

			log.Fatal(err)
		}

		nChunks++
		nBytes += int64(len(buf))

		// fmt.Println(string(buf))
		data += string(buf)

		if err != nil && err != io.EOF {
			log.Fatal(err)
		}
	}

	// fmt.Println("Bytes:", nBytes, "Chunks:", nChunks)
	return data
}

func main() {
	if isStdin() {
		str := getDataFromStdin()
		fmt.Println(str)
	}
}

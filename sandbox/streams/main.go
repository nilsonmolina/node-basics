package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"runtime"
	"strings"
	"time"
)

func main() {
	printMemUsage()

	file, err := os.Open("./files/cat-2019-01-raw.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	output, err := os.Create("./output/output.txt")
	if err != nil {
		panic(err)
	}
	defer output.Close()

	start := time.Now()

	scanner := bufio.NewScanner(file)
	writer := bufio.NewWriter(output)
	for scanner.Scan() {
		line := strings.Split(scanner.Text(), ",")
		for i, v := range line {
			if i != 1 {
				line[i] = strings.ReplaceAll(v, " ", "")
			}
		}
		line = append(line, "CAT")
		l := strings.Join(line, ",") + "\n"
		l = strings.ReplaceAll(l, "\"", "")
		l = strings.ReplaceAll(l, "\\'", "")
		writer.Write([]byte(l))
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	log.Printf("Elapsed Time: %s", time.Since(start))
	printMemUsage()
}

func printMemUsage() {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	// For info on each, see: https://golang.org/pkg/runtime/#MemStats
	fmt.Printf("Alloc = %v MiB", bToMb(m.Alloc))
	fmt.Printf("\tTotalAlloc = %v MiB", bToMb(m.TotalAlloc))
	fmt.Printf("\tSys = %v MiB", bToMb(m.Sys))
	fmt.Printf("\tNumGC = %v\n", m.NumGC)
}

func bToMb(b uint64) uint64 {
	return b / 1024 / 1024
}

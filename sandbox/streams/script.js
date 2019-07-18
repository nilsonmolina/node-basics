const fs = require('fs');
const split = require('split2');
const through2 = require('through2');

const read = fs.createReadStream('./files/cat-2019-01-raw.txt');
const write = fs.createWriteStream('./output/test.txt');

const startTime = new Date();
let parts = 0;
let columns = null;

read
  .pipe(split())
  .pipe(through2({ decodeStrings: false }, function transform(chunk, encoding, next) {
    let line = chunk.split(',');
    if (columns === null) columns = line.length;
    else if (line.length !== columns) throw new Error('Lines are not even!');

    // REMOVE QUOTES FROM ALL COLUMNS | REMOVE SPACES FROM ALL BUT DESCRIPTION
    line = line.map((col, index) => (
      index === 1
        ? col.replace(/['"]+/g, '')
        : col.replace(/['"\s]+/g, '')
    ));
    // ADD BRAND COLUMN
    line.push('CAT');
    // COUNT LINES
    parts++;

    this.push(`${line.join(',')}\n`);
    next();
  }))
  .pipe(write)
  .on('finish', () => {
    console.log(`Raw Data has been cleaned!
  - Elapsed Time:    ${new Date() - startTime}ms
  - Number of Parts: ${parts}`);
  });

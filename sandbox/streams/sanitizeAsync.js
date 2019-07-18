const fs = require('fs');
const readline = require('readline');

async function sanitize() {
  const rstream = fs.createReadStream('./files/cat-2019-01-raw.txt');
  const wstream = fs.createWriteStream('./output/newTest.txt');
  const rl = readline.createInterface({
    input: rstream,
    crlfDelay: Infinity,
  });

  const startTime = new Date();
  let parts = 0;
  let columns = null;

  for await (const l of rl) {
    let line = l.split(',');
    if (columns === null) columns = line.length;
    else if (line.length !== columns) throw new Error('Columns are not even');

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

    wstream.write(`${line.join(',')}\n`, (err) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
    });
  }

  rl.on('close', () => {
    console.log(`Raw Data has been cleaned!
    - Elapsed Time:    ${new Date() - startTime}ms
    - Number of Parts: ${parts}`);
  });
}

sanitize();

// DEPENDENCIES
const fs = require('fs');
const path = require('path');
// const debug = require('debug')('utilities');
const { exec } = require('child_process');

function cleanFileBash(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const script = path.join(__dirname, '../bash/clean-cat.sh');
    exec(`${script} ${inputPath} ${outputPath}`, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
}

function cleanFileJS(inputPath, outputPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const cleanData = await readFile(inputPath);
      await writeFile(outputPath, cleanData);
      resolve();
    } catch (err) { reject(err); }
  });
}

function readFile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) reject(err);

      resolve(data.toString().split('\r\n').map((row) => {
        let r = row.split(',').map((col, index) => {
          // clean columns
          let column = col;
          if (index === 0) column = column.replace(/ |,/g, '');
          if (index === 4) column = column.replace(/ /g, '');
          column = column.replace(/"/g, '');
          return column;
        });
        // add column
        if (r.length > 1) r += ',CAT';
        return r;
      }).join('\r\n'));
    });
  });
}

function writeFile(filepath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, 'utf-8', (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

module.exports = {
  cleanFileJS,
  cleanFileBash,
};

// DEPENDENCIES
const fs = require('fs');
const path = require('path');
const debug = require('debug')('utilities');

function cleanUploads(cycle = 60 * 60 * 1000) {
  setInterval(async () => {
    const currentDate = new Date();
    const directory = path.join(__dirname, '../uploads');
    debug('cleanup started.');

    await fs.readdir(directory, (readErr, files) => {
      if (readErr) throw readErr;

      files.forEach((file) => {
        const filepath = path.join(directory, file);
        fs.stat(filepath, (statErr, stat) => {
          if (statErr) throw statErr;

          if (currentDate - stat.birthtime > cycle) {
            fs.unlink(filepath, (deleteErr) => {
              if (deleteErr) throw deleteErr;
              debug(`${filepath} deleted.`);
            });
          }
        });
      });
    });
  }, cycle);
}

module.exports = cleanUploads;

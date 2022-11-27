const { parse } = require('csv-parse');
const fs = require('fs');

async function read(file, delimiter = ',') {
  const filePath = file.path;

  return new Promise((resolve, reject) => {
    let rows = [];

    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: delimiter }))
      .on('data', function (row) {
        rows.push(row);
      })
      .on('end', function () {
        resolve(rows);
        fs.unlinkSync(filePath);
      })
      .on('error', function (error) {
        console.log(error.message);
        reject(error);
      });
  });
}

module.exports = { read };

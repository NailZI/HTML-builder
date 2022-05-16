// const fs = require('fs');
// const path = require('path');
// const dir = path.join(__dirname + '\\secret-folder');
// const value = fs.readdir(dir, { withFileTypes: true }, (err, files) => {
//   if (err) throw err;
//     // read_files = files;
//     console.log(files);
// });

// console.log(value);

const { readdir, stat } = require("fs").promises
const { join } = require("path")

const dirs = async path => {
  let dirs = []
  for (const file of await readdir(path)) {
    if ((await stat(join(path, file))).isFile()) {
      dirs = [...dirs, file]
    }
  }
  return dirs
}
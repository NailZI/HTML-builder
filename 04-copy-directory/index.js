const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
    // console.log('Папка была создана');
});
const dir_in = path.join(__dirname, '\\files');
const dir_out = path.join(__dirname, '\\files-copy');
// fs.readdir(dir_in, { withFileTypes: true }, (err, files) => { // извлечение файлов из папки
fs.readdir(dir_in, (err, files) => { // извлечение файлов из папки
    if (err) throw err;
      files.forEach(element => {
        fs.copyFile(path.join(dir_in, element), path.join(dir_out, element), err => {
            if (err) throw err;
            // console.log(element);
        })
      });
    });

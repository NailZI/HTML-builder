const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname + '\\styles'); // создание пути к папке
const output_txt = fs.createWriteStream(path.join(__dirname, '\\project-dist\\', 'bundle.css'));
fs.readdir(dir, { withFileTypes: true }, (err, files) => { // извлечение файлов из папки
  if (err) throw err;
    files.forEach(element => {
      if (element.isFile() && path.extname(element.name) === '.css') {
        // console.log(element.name);
        let content = fs.createReadStream(path.join(__dirname, '\\styles\\', element.name), 'utf-8');
        content.on('data', chunk => {
          output_txt.write(chunk);
          output_txt.write('\n');
            });
            }
        })
      });
    
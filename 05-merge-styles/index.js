const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname + '\\styles'); // создание пути к папке
fs.readdir(dir, { withFileTypes: true }, (err, files) => { // извлечение файлов из папки
  if (err) throw err;
    files.forEach(element => {
      if (element.isFile() && path.extname(element.name) === '.css') {
        // console.log(element.name);
        let content = fs.createReadStream(path.join(__dirname, '\\styles\\', element.name), 'utf-8');
        content.on('data', chunk => {
            fs.appendFile(path.join(__dirname, '\\project-dist\\', 'bundle.css'), chunk, err => {
                    if (err) throw err;
                    // console.log('OK')
                })
            });
            }
        })
      });
    
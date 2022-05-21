const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname + '\\secret-folder'); // создание пути к папке
fs.readdir(dir, { withFileTypes: true }, (err, files) => { // извлечение файлов из папки
  if (err) throw err;
    files.forEach(element => {
      let file = {};
      if (element.isFile()) {
        file.name = path.basename(element.name, path.extname(element.name));
        file.extension = path.extname(element.name);
        path_to_file = path.join(dir + "\\" + element.name);
        fs.stat(path_to_file, (err, stat) => {
          // console.log(stat.size);
          file.size = stat.size;
          console.log(file.name + ' -' + file.extension.replace(/[.]/g, ' ') + ' - ' + file.size)
        });
      }
    });
  });

 
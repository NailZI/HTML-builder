const fs = require("fs");
const path = require("path");
// const { toUnicode } = require("punycode");

// Создаёт папку  **project-dist**.
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
  // console.log('Папка была создана');
});

// Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.
// const dir_components = path.join(__dirname, 'components');
// fs.readFile(dir_components, (err, files) => {
//   if (err) throw err;
//   console.log(files)
// });
// const read_file = path.join(__dirname, 'template.html');
// const write_file = fs.createWriteStream(path.join(__dirname, '\\project-dist\\index.html'));
// fs.readFile(read_file, (err, data) => {
//   if(err) throw err;
//   let array = data.toString().split("\n");
//   array.forEach(element => {
//       console.log(element);
//       if (element.includes('first')) {
//           console.log('первая строка');
//           write_file.write('11111');
//           write_file.write('\n');
//       } else {
//           write_file.write(element);
//           // fs.createWriteStream(path.join(__dirname, 'new.txt')).write("\n");
//       }
//   }); 
// });

// Собирает в единый файл стили из папки **styles** и помещает их в файл **project-dist/style.css**.
const dir = path.join(__dirname + '\\styles'); // создание пути к папке
fs.readdir(dir, { withFileTypes: true }, (err, files) => { // извлечение файлов из папки
  if (err) throw err;
  files.forEach(element => {
    if (element.isFile() && path.extname(element.name) === '.css') {
      let content = fs.createReadStream(path.join(__dirname, '\\styles\\', element.name), 'utf-8');
      content.on('data', chunk => {
        fs.appendFile(path.join(__dirname, '\\project-dist\\', 'style.css'), chunk, err => {
          if (err) throw err;
          // console.log('OK')
        })
      });
    }
  })
});

// Копирует папку **assets** в **project-dist/assets**
let dir_in = 'assets';
let dir_out = 'project-dist';
let path_dir_in = path.join(__dirname, `\\${dir_in}`);
let path_dir_out = path.join(__dirname, `\\${dir_out}`);
function copy_files(dir_in, dir_out, path_dir_in, path_dir_out) {
  // console.log(dir_in, '\n', dir_out, '\n', path_dir_in, '\n', path_dir_out)
  fs.mkdir(path.join(path_dir_out, dir_in), { recursive: true }, (err) => {
    if (err) throw err;
    });
  fs.readdir(path_dir_in, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(element => {
      // console.log(element)
      if (element.isFile()) {
        console.log('file> ', element)
        // fs.copyFile(path_dir_in, path_dir_out, err => {
        //   if (err) throw err;
        // })
      } else {
          console.log('dir> ', element)
          dir_in = element.name;
          dir_out = element.name;
          console.log('dir_in> ', dir_in);
          console.log('dir_out> ', dir_out);
          
          // path_dir_in += '\\' + element.name;
          // path_dir_out += '\\' + element.name;
          path_dir_in = path.join(__dirname, element.name);
          path_dir_out = path.join(__dirname, element.name);
          copy_files(dir_in, dir_out, path_dir_in, path_dir_out);
      }
    })
  });
}
copy_files(dir_in, dir_out, path_dir_in, path_dir_out)
// fs.mkdir(path.join(dir_out, 'assets'), { recursive: true }, (err) => {
//   if (err) throw err;
//   // console.log('Папка была создана');
// });
// fs.readdir(dir_in, (err, files) => { // извлечение файлов из папки
//     if (err) throw err;
//       files.forEach(element => {
//         fs.copyFile(path.join(dir_in, element), path.join(dir_out, 'assets\\', element), err => {
//             if (err) throw err;
//             // console.log(element);
//         })
//       });
//     });
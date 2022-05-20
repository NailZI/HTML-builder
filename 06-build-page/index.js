const fs = require("fs");
const path = require("path");

// Создаёт папку  **project-dist**.
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
  // console.log('Папка была создана');
});

// Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.
const dir_components = path.join(__dirname, 'components');
let comp_files = [];
const any = await fs.readdir(dir_components, (err, files) => {
    if (err) throw err;
    files.forEach(element => {
      comp_files.join(element);
      console.log(element);
    })
  });
// while (!comp_files.length) {}
console.log('components> ', comp_files)
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
const dir_name = 'assets'; // папка из которой копируем
fs.mkdir(path.join(__dirname, 'project-dist', dir_name), { recursive: true }, (err) => { // создаем папку assets  в project-dist
  if (err) throw err;
  });
// функция читает содержимое папки и переносит файлы в project-dist
function copy_files(dir_name) {
  let path_dir_in = path.join(__dirname, dir_name); // путь к папке из которой берем
  let path_dir_out = path.join(__dirname, 'project-dist', dir_name); // путь к папке в которую кладем
  fs.readdir(path_dir_in, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(element => {
      if (!element.isFile()) { // копируем вложенные папки и читаем их содержимое
        fs.mkdir(path.join(path_dir_out, element.name), { recursive: true }, (err) => {
          if (err) throw err;
          });
        let internal_dir = dir_name + '\\' + element.name;
        return copy_files(internal_dir); // рекурсивный запуск функции
      } else if (element.isFile()) { // копируем файлы
          fs.copyFile(path.join(path_dir_in, element.name), path.join(path_dir_out, element.name), err => {
          if (err) throw err;
        })
      }
    })
  });
}
copy_files(dir_name)

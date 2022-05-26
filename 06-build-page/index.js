const fs = require("fs");
const promises = require("fs/promises")
const path = require("path");

// Создаёт папку  **project-dist**.
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
  // console.log('Папка была создана');
});

// Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.
async function merge_html() {
  const dir_components = path.join(__dirname, 'components');
  let comp_files = [];
  const any_file = await promises.readdir(dir_components, { withFileTypes: true });
  for (const files of any_file) {
    let obj = {};
    if (files.isFile() && path.extname(files.name) === '.html') {
      obj.name = path.basename(files.name, path.extname(files.name));
      obj.content = await promises.readFile(path.join(dir_components, files.name), 'utf-8');
      comp_files.push(obj)
    }
  }
  const path_to_read_file = path.join(__dirname, 'template.html');
  const write_file = fs.createWriteStream(path.join(__dirname, '\\project-dist\\index.html'));
  let read_temp = await promises.readFile(path_to_read_file, 'utf-8');
  for (const part of comp_files) {
    read_temp = read_temp.replace(`{{${part.name}}}`, part.content);
  }
  write_file.write(read_temp); // заполняем index.html
}
merge_html();

// Собирает в единый файл стили из папки **styles** и помещает их в файл **project-dist/style.css**.
async function merge_css() {
  const dir = path.join(__dirname + '\\styles'); // создание пути к папке
  const read_styles = await promises.readdir(dir, { withFileTypes: true });
  const output_txt = fs.createWriteStream(path.join(__dirname, '\\project-dist\\', 'style.css'));
  for (const style_file of read_styles) {
      if (style_file.isFile() && path.extname(style_file.name) === '.css') {
        let content = fs.createReadStream(path.join(__dirname, '\\styles\\', style_file.name), 'utf-8');
        content.on('data', chunk => {
          output_txt.write(chunk);
          output_txt.write('\n');
        });
      }
    }
};
merge_css();

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

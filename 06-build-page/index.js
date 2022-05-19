const fs = require("fs");
const path = require("path");
const { toUnicode } = require("punycode");

// Создаёт папку  **project-dist**.
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
  // console.log('Папка была создана');
});

// Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.


// Собирает в единый файл стили из папки **styles** и помещает их в файл **project-dist/style.css**.

// Копирует папку **assets** в **project-dist/assets**
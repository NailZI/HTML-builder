const readline = require('readline');
const path = require('path');
const fs = require('fs');
const output_txt = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Введите ваш текст> '
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'exit':
        console.log('Хорошего дня!');
        process.exit(0);
      break;
    case '':
      console.log('Для сохранения в файл необходимо ввести текст!');
      break;
    default:
        output_txt.write(line);
        output_txt.write('\n');
      console.log(`Сохранен следующий текст: '${line.trim()}'`);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Хорошего дня!');
  process.exit(0);
});

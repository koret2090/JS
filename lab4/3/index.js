"use strict";

// получаем параметры скрипта
const valueA = "" + process.argv[2];
const valueB = "" + process.argv[3];

// импортируем библиотеку
const execSync = require('child_process').execSync;

// функция для вызова программы и получения результата её работы
function useCmd(s) {
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}

// получаем сумму
const sumCommand = `node a.js ${valueA} ${valueB}`;
console.log(sumCommand);
let sum = useCmd(sumCommand);
sum = parseInt(sum);
console.log(sum);

// получаем произведение на два
const mulCommand = `node b.js ${c}`;
console.log(mulCommand);
let mul = useCmd(mulCommand);
mul = parseInt(mul);
console.log(mul);
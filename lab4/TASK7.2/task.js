"use strict";

// получаем параметры скрипта
const valueA = "" + process.argv[2];
let string = "";
for (let i = 2; i < process.argv.length; i++)
    string += process.argv[i] + ' ';

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
const factorial_com = `node a.js ${valueA}`;
console.log(factorial_com);
let factorial = useCmd(factorial_com);
console.log(factorial);

// получаем произведение на два
const arr_factorial_com = `node b.js ${string}`;
console.log(arr_factorial_com);
let arr_factorial = useCmd(arr_factorial_com);
console.log(arr_factorial);
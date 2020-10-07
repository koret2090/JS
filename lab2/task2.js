"use strict";

let vowel_letters = "EYUIOA";
function vowel_letter_check(string){
    let flag = 1;
    for (let i = 0; i < string.length && flag; i++){
        // проверка на гласные
        for (let j = 0; j < 6 && flag; j++){
            if (string.charAt(i).toUpperCase() === vowel_letters[j]){
                console.log(string);
                flag = 0;
            }
        }
    }
}

let json_string;
const fs = require('fs');
json_string = fs.readFileSync("file1.txt", "utf8");
console.log(json_string);

let array = JSON.parse(json_string);

for (let i = 0; i < array.length; i++)
    vowel_letter_check(array[i]);



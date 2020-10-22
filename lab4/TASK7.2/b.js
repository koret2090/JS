"use strict";
let array = [];
for (let i = 2; i < process.argv.length; i++)
    array[i - 2] =  process.argv[i]; 

for (let i = 0; i < array.length; i++){
    let result = 1;
    let num = array[i]
    for(let j = 1; j <= (num); j++){
        result *= j;
    }
    array[i] = result;
}

let string = '';
for (let i = 0; i < array.length; i++)
    string += array[i] + ' ';

console.log(string);
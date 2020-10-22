"use strict";

const x = "" + process.argv[2];
const num = parseInt(x);
let result = 1;
for(let i = 1; i < num+1; i++){
    result *= i;
}

console.log("" + result);
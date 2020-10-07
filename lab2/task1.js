"use strict";

const readline_sync = require('readline-sync');
//let array = {};
//array["strings"] = [];
let array = [];

const n = readline_sync.question("Input N: ");

for (let i = 0; i < n; i++){
     let string = readline_sync.question("Input string: ");
     if ((string.length % 2) == 0)
     array.push(string);
}


const json_string = JSON.stringify(array);

const fs = require("fs");
fs.writeFileSync("file1.txt", json_string);


//console.log(strings);
    
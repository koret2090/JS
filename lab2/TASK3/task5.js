"use strict";
const fs = require('fs');
const readline_sync = require('readline-sync');

const n = readline_sync.question("Input N: ");
let filenames = [];
let string = "";

for (let i = 0; i < n; i++)
    filenames[i] = readline_sync.question("Input filename: ");

for (let i = 0; i < n; i++){
    string = string + fs.readFileSync(filenames[i], "utf8");
}

fs.writeFileSync("file5.txt", string);

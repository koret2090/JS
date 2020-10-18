"use strict";

const fs = require("fs");

let mails = [];
let phone_numbers = [];

function load_base(){
    let strings = fs.readFileSync("base.txt", "utf8");
    strings = strings.split('\n');
    for (let i = 0; i < strings.length; i++){
        let string = strings[i].split(',');
        mails.push(string[0]);
        phone_numbers.push(string[2]);
    }
}

load_base();
console.log("MAILS", mails);
console.log("PHONES", phone_numbers);
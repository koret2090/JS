"use strict";
const fs = require('fs');
const readline_sync = require('readline-sync');


function format_check(filename, format){
    let flag = 1;
    for (let i = 0; i < format.length; i++){
        if (filename[filename.length - 1 - i] != format[format.length - 1 - i])
            flag = 0;      
    }
    return flag;
}

function read_cur_format_files(folder, filenames_array, format){
    console.log("Info in files\n");
    for (let i = 0; i < filenames_array.length; i++){
        let check = format_check(filenames_array[i], format);
        if (check)
            console.log(fs.readFileSync(folder + "/" + filenames_array[i], "utf8"));
    }
}

const format = readline_sync.question("Input files format: ");
const folder = readline_sync.question("Input folder directory: ");
//const folder = "./folder3";
//const format = "txt";
const filenames_array = fs.readdirSync(folder);


read_cur_format_files(folder, filenames_array, format);


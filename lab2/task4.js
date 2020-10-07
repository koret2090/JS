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

function check_folder(folder){
    const names = fs.readdirSync(folder);
    for (let i = 0; i < names.length; i++){
        if (format_check(names[i], "txt")){
            if (fs.readFileSync(folder + "/" + names[i], "utf8").length <= 10)
                console.log(folder + "/" + names[i]);
        }
        else
            check_folder(folder + "/" + names[i]);
    }
}

const folder = "./folderTASK4";
console.log("F I L E S\n");
check_folder(folder);
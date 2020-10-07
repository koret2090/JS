"use strict";

function max_lvl_nesting(object, tree){
    let lvl = 1;
    for (let field in object){
        if(typeof(object[field]) == "object"){
            let cur_lvl = max_lvl_nesting(object[field]) + 1;
            if (cur_lvl > lvl)
                lvl = cur_lvl;    
        }
    }
    return lvl;
}

const fs = require("fs");
let string = fs.readFileSync("file7.txt", "utf8");
let obj = JSON.parse(string);
let tree = "";

"use strict";

let way = [];
let max_way = [];
function max_lvl_nesting(object){
    let lvl = 1; 
    for (let field in object){
        if(typeof(object[field]) == "object"){
            way.push(field);
            if (way.length > max_way.length){
                max_way = way.slice();
            }            
            let cur_lvl = max_lvl_nesting(object[field]) + 1;
        }
        way.pop();
    }
    return lvl;
}

const fs = require("fs");
let string = fs.readFileSync("file7.txt", "utf8");
let obj = JSON.parse(string);
let level = max_lvl_nesting(obj);
console.log("MAX TREE\n", max_way);


"use strict";

let answer_tree = "";
let tre = "";
let change = 0;
/*
function max_lvl_nesting(object, tree){
    let lvl = 1; 
    for (let field in object){
        let old_tree = tree;
        tree += field + ".";
        if(typeof(object[field]) == "object"){
            //console.log(tree);
            let cur_lvl = max_lvl_nesting(object[field], tree) + 1;
            if (cur_lvl > lvl){
                lvl = cur_lvl;
                answer_tree = tree;
                //console.log("OBJ ", object);
                console.log(field);
                //tree = "";   
            } 
        }
        tree = old_tree;
    }
    return lvl;
}
*/


let arr_check = [];
let max_arr = [];
function max_lvl_nestingD(object){
    let lvl = 1; 
    for (let field in object){
        if(typeof(object[field]) == "object"){
            arr_check.push(field);
            let cur_lvl = max_lvl_nesting(object[field]) + 1;
            if (cur_lvl > lvl){
                lvl = cur_lvl;
                if (arr_check.length > max_arr.length){
                    max_arr = arr_check;
                    arr_check = [];
                }
            } 
        }
    }
    return lvl;
}

let way = [];
function max_lvl_nesting(object){
    let lvl = 1; 
    for (let field in object){
        if(typeof(object[field]) == "object"){
            let cur_lvl = max_lvl_nesting(object[field]) + 1;
            if (cur_lvl > lvl){
                lvl = cur_lvl;
                //console.log(field);
                way.push(field);
            } 
        }
    }
    return lvl;
}

function nesting(object){
    let ans = max_lvl_nesting(object);
    let temp_obj = object;
    for (let i = 0; i < way.length; i++){
        temp_obj = temp_obj[way[way.length - i - 1]];
    }

    for (let field in temp_obj){
        way.unshift(field);
        break;
    }
    
    console.log("TREE");

    for (let i = 0; i < way.length; i++)
        console.log(way[i]);

    return ans;
}


const fs = require("fs");
let string = fs.readFileSync("file7.txt", "utf8");
let obj = JSON.parse(string);
let level = 0;
let trees = "";
let a = ""
//level = max_lvl_nesting(obj);
level = nesting(obj);
//console.log("ANSWER LVL", level, "\nTREE", answer_tree);
//level = max_lvl_nestingD(obj);
//for (let key in max_arr){
//    console.log(max_arr[key]);
//}

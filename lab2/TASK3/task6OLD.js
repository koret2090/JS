"use strict";

function max_lvl_nesting(object){
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

let super_small_obj = {
    field1111: 1,
}

let small_obj1 = {
    field111: 1,
    field222: 2,
};

let small_obj2 = {
    field111: 1,
    field222: super_small_obj,
};

let small_obj3 = {
    field111: 1,
    field222: 2,
};

let obj = {
    field11: small_obj1,
    field22: small_obj2,
};

let big_obj = {
    field1: 1,
    field2: obj,
    field3: small_obj3,
};

console.log("MAX LVL:", max_lvl_nesting(big_obj));

//let string = JSON.stringify(big_obj, null, 4);

//const fs = require("fs");
//fs.writeFileSync("file7.txt",string);
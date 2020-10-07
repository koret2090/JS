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

let small_obj1 = {
    field1: 1,
    field2: 2,
};

let small_obj2 = {
    field1: 1,
    field2: 2,
};

let small_obj3 = {
    field1: 1,
    field2: 2,
};

let obj = {
    field1: small_obj1,
    field2: small_obj2,
};

let big_obj = {
    field1: 1,
    field2: obj,
    field3: small_obj3,
};

console.log("MAX LVL:", max_lvl_nesting(big_obj));
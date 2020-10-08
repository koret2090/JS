"use strict";

let obj = {};
let cur_object = obj;
let i = 0;

function recurs_nesting(cur_obj){
    cur_obj.new_field = {};
    cur_obj = cur_obj.new_field;
    try{
        //object.new_field = {};
        let string = JSON.stringify(obj);
        i+= 1;
        return recurs_nesting(cur_obj);
    }
    catch(error){
        console.log(i);
        return;
    }  
}
/*
let object2 = {}
let err = "";
let check = true;
let cur_object2 = object2;
console.log(obj);

i = 0;
function nesting(){
    while (check){
        cur_object2.field = {};
        cur_object2 = cur_object2.field;
        try{
            let string = JSON.stringify(object2);
            i += 1;
        }
        catch(err){
            console.log("MAX LVL:", i);
            check = false;
        }
    }
    return 0;
}

nesting();
i = 0;
*/
recurs_nesting("MAX NESTING LVL:", cur_object); 
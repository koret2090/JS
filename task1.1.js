"use strict";

function create(surname, age, array){
    let kid = {};
    kid["surname"] = surname;
    kid["age"] = age;

    let flag = 1;
    for (let i = 0; i < array.length && flag; i++){
        if (array[i]["surname"] === surname)
            flag = 0;
    }

    if (flag)
        array.push(kid);
    else
        console.log("Array already has", surname,"\nYou can't add simmilar.")
}

function read(surname, array){
    let i = 0;
    for (; i < array.length; i++)
    {
        if (surname === array[i]["surname"])
        {
            console.log("Age: " + array[i]["age"]);
            break;
        }
    }
    if (i === array.length)
        console.log("There is no " + surname + " in array");
}

// change kid's age
function update(surname, new_age, array){
    for (let i = 0; i < array.length; i++){
        if (surname === array[i]["surname"])
        {
            array[i]["age"] = new_age;
            break;
        }
    }
}

function del(index, array){
    if (index < array.length)
        array.splice(index, 1); // c какого и сколько
    else
        console.log("There is no kid by this index");
}

//////////////////////////////////////////////////////////////

function get_avrg_age(array){
    let result = 0;
    for (let i = 0; i < array.length; i++)
        result += array[i]["age"];
    
    result /= array.length;
    console.log("Average age: " + result);
    //else
    //    console.log("Array is empty");
}

function oldest_kid_info(array){
    let max_age_index = 0;
    let max_age = array[0]["age"];
    for (let i = 1; i < array.length; i++)
    {
        if (array[i]["age"] > max_age)
        {
            max_age = array[i]["age"];
            max_age_index = i;
        }
    }

    console.log("Surname: " + array[max_age_index]["surname"]);
    console.log("Age: ", + array[max_age_index]["age"]);
}

function get_age_pool_kids_info(start, end, array){
    for (let i = 0; i < array.length; i++){
        if (array[i]["age"] >= start && array[i]["age"] <= end){
            console.log("Surname:", array[i]["surname"]);
            console.log("Age:", array[i]["age"]);
        }
    }
}

function kids_info_by_first_letter(letter, array){
    for (let i = 0; i < array.length; i++){
        if (array[i]["surname"].charAt(0) === letter){
            console.log("Surname:", array[i]["surname"]);
            console.log("Age:", array[i]["age"]);
        }
    }
}

function surnames_longer_than(len, array){
    for (let i = 0; i < array.length; i++){
        if (array[i]["surname"].length > len){
            console.log("Surname:", array[i]["surname"]);
            console.log("Age:", array[i]["age"]);
        }
    }
}

let vowel_letters = "EYUIOA";
function info_by_vowel_letters_info(array){
    for (let i = 0; i < array.length; i++){
        // проверка на гласные
        for (let j = 0; j < 6; j++){
            if (array[i]["surname"].charAt(0) === vowel_letters[j]){
                console.log("Surname:", array[i]["surname"]);
                console.log("Age:", array[i]["age"]);
            }
        }
    }
}
////////////////////////////////////////////////////////////

let kid1, kid2, kid3, kid4;
kid1 = {}; kid2 = {}; kid3 = {}; kid4 = {};

kid1["surname"] = "Orange";
kid1["age"] = 12;

kid2["surname"] = "Yellow";
kid2["age"] = 13;

kid3["surname"] = "Black";
kid3["age"] = 9;

kid4["surname"] = "Green";
kid4["age"] = 10;

let children = [];

children.push(kid1);
children.push(kid2);
children.push(kid3);
children.push(kid4);

create("Blue", 15, children);
read("Blue", children);
update("Blue", 16, children);
read("Blue", children);
del(4, children)
read("Blue", children);

console.log("get_avrg_age");
get_avrg_age(children);
console.log("\n");

console.log("oldest_kid_info");
oldest_kid_info(children);
console.log("\n");

console.log("get_age_pool_kids_info");
get_age_pool_kids_info(12, 15, children);
console.log("\n");

console.log("kids_info_by_first_letter");
kids_info_by_first_letter("B", children);
console.log("\n");

console.log("surnames_longer_than");
surnames_longer_than(4, children);
console.log("\n");


console.log("info_by_vowel_letters_info");
info_by_vowel_letters_info(children);
console.log("\n");

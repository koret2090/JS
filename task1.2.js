"use strict";

function copy_marks(marks_from, marks_to)
{
    for (let i = 0; i < marks_from.length; i++)
        marks_to[i] = marks_from[i];
}

function print_marks(marks)
{
    for (let i = 0; i < marks.length; i++)
        console.log(marks[i]);
}

function create(group, student_card, marks, array){
    let student = {};
    student["group"] = group;
    student["student_card"] = student_card;
    student["marks"] = [];
    
    let flag = 1;
    for (let i = 0; i < array.length && flag; i++){
        if (array[i]["student_card"] === student_card)
            flag = 0;
    }

    if (flag){
        copy_marks(marks, student["marks"]);
        array.push(student);
    }
    else
        console.log("Array already has", student_card,"\nYou can't add simmilar.");
}

function read(student_card, array){
    let i = 0;
    for(; i < array.length; i++)
    {
        if (student_card === array[i]["student_card"])
        {
            console.log("Group:", array[i]["group"]);
            console.log("Marks");
            print_marks(array[i]["marks"])
            break;
        }
    }
    if (i === array.length)
        console.log("There is no " + student_card + " in array");
}

function update(student_card, group, marks, array){
    for (let i = 0; i < array.length; i++){
        if (student_card === array[i]["student_card"])
        {
            array[i]["group"] = group;
            copy_marks(marks, array[i]["marks"]);
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

function get_student_avrg_marks(student){
    let result = 0;
    for (let i = 0; i < student["marks"].length; i++)
        result += student["marks"][i];
    
    result /= student["marks"].length;
    console.log("Average marks of", student["student_card"], ":", result);
}

function get_group_info(group_number, stream){
    for (let i = 0; i < stream.length; i++){
        if (stream[i]["group"] === group_number){
            console.log("Student card: ", stream[i]["student_card"]);
            print_marks(stream[i]["marks"]);
        }
    }
}

function the_highest_number_of_marks_in_group(group_number, stream){
    let temp = stream[0];
    for (let i = 1; i < stream.length; i++){
        if (stream[i]["group"] === group_number && 
        stream[i]["marks"].length > temp["marks"].length)
            temp = stream[i];
    }

    console.log("Student card: ", temp["student_card"]);
    print_marks(temp["marks"]);
}

function student_with_no_marks_info(stream){
    for (let i = 0; i < stream.length; i++){
        if (stream[i]["marks"].length === 0){
            console.log("Group:", stream[i]["group"])
            console.log("Student card: ", stream[i]["student_card"]);
        }
    }
}
////////////////////////////////////////////////////////////

let st1, st2, st3, st4;
st1 = {}; st2 = {}; st3 = {}; st4 = {};

st1["group"] = 1;
st1["student_card"] = 10000;
st1["marks"] = [5, 4, 4, 5, 5];

st2["group"] = 2;
st2["student_card"] = 10001;
st2["marks"] = [];

st3["group"] = 1;
st3["student_card"] = 10011;
st3["marks"] = [5, 4, 5, 5, 5, 5, 5];

st4["group"] = 1;
st4["student_card"] = 10100;
st4["marks"] = [5, 5, 4, 5, 5];


let stream = [st1, st2, st3, st4]

read(10000, stream);

create(2, 10101, [], stream);
read(10101, stream);
update(10101, 2, [2], stream);
read(10101, stream);
del(4, stream);
read(10101, stream);

console.log("\n");
get_student_avrg_marks(stream[0]);
console.log("\n");
get_group_info(1, stream);
console.log("\n");
the_highest_number_of_marks_in_group(1, stream);
console.log("\n");
student_with_no_marks_info(stream);
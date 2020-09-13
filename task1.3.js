"use strict";

function create(name, x, y, array){
    let point = {};
    point["name"] = name;
    point["x"] = x;
    point["y"] = y;
    
    let flag = 1;
    for (let i = 0; i < array.length && flag; i++){
        if (array[i]["name"] === name)
            flag = 0;
    }

    if (flag)
        array.push(point);
    else
        console.log("Array already has", name,"\nYou can't add simmilar.");
}

function read(name, array){
    let i = 0;
    for (; i < array.length; i++){
        if (name === array[i]["name"]){
            console.log("X:", array[i]["x"], "Y:", array[i]["y"]);
            break;
        }
    }

    if (i === array.length)
        console.log("There is no point" + name + " in array");
}

function update(name, x, y, array){
    for (let i = 0; i < array.length; i++){
        if (name === array[i]["name"]){
            array[i]["x"] = x;
            array[i]["y"] = y;
            break;
        }
    }
}

function del(name, array){
    let i = 0
    for (; i < array.length; i++){
        if (name === array[i]["name"]){
            array.splice(i, 1); // c какого и сколько
        }
    }
    if (i === array.length)
        console.log("There is no point by this name");
}

//////////////////////////////////////////////////////////////

function points_with_highest_range(array){
    let l = 0;
    let answer_point1 = {}; let answer_point2 = {}; 
    for (let i = 0; i < array.length; i++){
        for (let j = 0; j < array.length; j++){
            let temp = Math.sqrt((array[i]["x"] - array[j]["x"])
             * (array[i]["x"] - array[j]["x"])
              + (array[i]["y"] - array[j]["y"]) * (array[i]["y"] - array[j]["y"]));  
            if (temp > l){
                l = temp;
                answer_point1 = array[i]["name"];
                answer_point2 = array[j]["name"];
            }
        }
    }

    console.log("Len:", l, "between points", answer_point1, answer_point2);
}

function points_on_this_range(point, array, distance){
    for (let i = 0; i < array.length; i++){
        let temp = Math.sqrt((point["x"] - array[i]["x"])
        * (point["x"] - array[i]["x"])
         + (point["y"] - array[i]["y"]) * (point["y"] - array[i]["y"]));
        
        if (temp <= distance && point["name"] != array[i]["name"]){
            console.log("Points", point, array[i]["name"], "with range", temp);
        }
    }
}

// 0 - ось Ox, 1 - Oy
function over_axis(axis, array){
    for (let i = 0; i < array.length; i++){
        if (axis == 0){
            if (array[i]["x"] >= 0)
                console.log("Point", array[i]["name"], "is to the right");
            else
                console.log("Point", array[i]["name"], "is to the left");
        }
        else{
            if (array[i]["y"] >= 0)
                console.log("Point", array[i]["name"], "is to the up");
            else
                console.log("Point", array[i]["name"], "is to the down");
        }
    }   
}

// левая верхняя, правая верхняя, правая нижняя, левая нижняя
function get_left_top_point(polygon){
    let point = polygon[0];
    for (let i = 1; i < polygon.length; i++){
        if (polygon[i]["x"] <= point["x"] && polygon[i]["y"] >= point["y"])
            point = polygon[i];
    }

    return point;
}

function get_right_bottom_point(polygon){
    let point = polygon[0];
    for (let i = 1; i < polygon.length; i++){
        if (polygon[i]["x"] >= point["x"] && polygon[i]["y"] <= point["y"])
            point = polygon[i];
    }

    return point;
}

function is_in_square(polygon, points){
    let left_top_point = get_left_top_point(polygon);
    let right_bottom_point = get_right_bottom_point(polygon);

    console.log(left_top_point, right_bottom_point);

    for (let i = 0; i < points.length; i++){
        if (points[i]["x"] > left_top_point["x"]
         && points[i]["y"] < left_top_point["y"]
            && points[i]["x"] < right_bottom_point["x"]
                && points[i]["y"] > right_bottom_point["y"])
                console.log("Point", points[i]["name"], "is in polygon");               
    }
}

//////////////////////////////////////////////////////////////

let point1, point2, point3, point4;
point1 = {}; point2 = {}; point3 = {}; point4 = {};

point1["name"] = 1;
point1["x"] = 8;
point1["y"] = 12;

point2["name"] = 2;
point2["x"] = 0;
point2["y"] = 0;

point3["name"] = 3;
point3["x"] = -1;
point3["y"] = -1;

point4["name"] = 4;
point4["x"] = 2;
point4["y"] = 2;


let points = [point1, point2, point3, point4];

read(1, points);

create(5, -1, -1, points);
read(5, points);
update(5, -2, -2, points);
read(5, points);
del(5, points);
read(5, points);

console.log("\n");
points_with_highest_range(points);
console.log("\n");
points_on_this_range(point2, points, 3);
console.log("\n");
over_axis(1, points);
console.log("\n");

let polygon_point1, polygon_point2, polygon_point3, polygon_point4;
polygon_point1 = {}; polygon_point2 = {};
polygon_point3 = {}; polygon_point4 = {};

polygon_point1["x"] = 5;
polygon_point1["y"] = 5;

polygon_point2["x"] = 5;
polygon_point2["y"] = -5;

polygon_point3["x"] = -5;
polygon_point3["y"] = 5;

polygon_point4["x"] = -5;
polygon_point4["y"] = -5;

let polygon = [polygon_point1, polygon_point2, polygon_point3, polygon_point4];

is_in_square(polygon, points);
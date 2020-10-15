"use strict";

/*
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


let stream = [st1, st2, st3, st4];

const fs = require('fs');
fs.writeFileSync("file.txt", JSON.stringify(stream, null, 4));
*/

const fs = require("fs");

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("My server on port " + port);

app.get("/me/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/calculate/sum", function(request, response) {
    let string = fs.readFileSync("file.txt");
    const object = JSON.parse(string);
    
    const index = request.query.index;
    const indexInt = parseInt(index);
    if (index < object.len){
        const answerJSON = JSON.stringify(object[index]);
        response.end(answerJSON);
    }
    else{
        response.end("Your index is out of range");
    }
});
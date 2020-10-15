"use strict"

function div_array(from, to, del){
    let array = [];
    for (let i = from; i <= to; i++){
        if ((i % del) == 0)
            array.push(i);
    }
    return array;
}

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

app.get("/calculate/array", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);

    const array = div_array(aInt, bInt, cInt);
    response.end("Your array: " + array);
});
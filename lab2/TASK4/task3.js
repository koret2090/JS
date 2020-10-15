"use strict"
const fs = require("fs");


function create_html_page(fields_array, adress){
    let string = "<!DOCTYPE html>\n\
    <html>\n\
    <head>\n\
        <meta charset='UTF-8'>\n\
        <title>Страница A</title>\n\
    </head>\n\
    <body>\n\
        <h1>Генератор объекта</h1>\n\
        <form method='GET' action=" + adress + ">\n";
    fs.writeFileSync("task3.html", string);

    for (let i = 0; i < fields_array.length; i++){
        string = "<p>Введите поле " + fields_array[i] + ":</p>\n\
        <input name=" + fields_array[i] + " spellcheck='false' autocomplete= 'off'></input>\n";
        fs.appendFileSync("task3.html", string);
    }

    string = "<br>\n\
    <br>\n\
    <input type='submit' value='Отправить запрос'>\n\
    </form>\n\
    </body>\n\
    </html>\n";
    fs.appendFileSync("task3.html", string);
}



//const fields_array = ["f1", "f2", "f3", "f4"];
//const adress = "/construct";
const readline_sync = require('readline-sync');
const n = readline_sync.question("Введите кол-во полей: ");
let fields_array = [];
for (let i = 0; i < n; i++){
    let field = readline_sync.question("Введите поле: ");
    fields_array.push(field);
}

const adress = readline_sync.question("Введите адрес: ");
create_html_page(fields_array, adress);



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

app.get(adress, function(request, response) {
    if (fs.existsSync("task3.html")) {
        const contentString = fs.readFileSync("task3.html", "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
    
    response.end("Dirijabl' AGA");
});
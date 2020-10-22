"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 501;
app.listen(port);
console.log("Server on port " + port);

// заголовки для ответа
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

/*
// приём запроса
app.get("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const name = request.query.name;
        let cars = request.query.cars;
        cars = cars.split(',');
        const obj = {name: name, cars: cars};
        fs.appendFileSync("warehouse.json", JSON.stringify(obj) + '\n');
        response.end('Added');
    });
});

app.get("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const answer = fs.readFileSync('warehouse.json', 'utf8');
        response.end(answer);
    });
});
*/

app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        fs.appendFileSync("warehouse.json", JSON.stringify(obj) + '\n');
        response.end(JSON.stringify({
            result: "Added"
        }));
    });
});

function get_warehouse_info(warehouse_name){
    let strings = fs.readFileSync('warehouse.json', 'utf8');
    strings = strings.split('\n');
    for (let i = 0; i < strings.length-1; i++){
        const obj = JSON.parse(strings[i]);
        if (obj.name === warehouse_name)
            return obj.cars;
    }
    return 0;
}

function convert_to_str(array){
    let string = '';
    console.log("ARRAY", array);
    for (let i = 0; i < array.length; i++){
        string += array[i] + '\n';
    }
    return string;
}
app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj.name;
        console.log("NAME", name);
        const answer = get_warehouse_info(name);
        if (answer != 0){
            const str_answer = convert_to_str(answer);
            response.end(JSON.stringify({
                result: str_answer
            }));}
        else
            response.end(JSON.stringify({
                result: "There is no such warehouse"
            }));
    });
});
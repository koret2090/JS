"use strict";

const { CONNREFUSED } = require("dns");
// импорт библиотеки
const express = require("express");
const fs = require("fs");
const request = require("request");

// запускаем сервер
const app = express();
const port = 500;
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

// приём запроса
/*
app.get("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const name = request.query.name;
        const cost = request.query.cost;
        console.log("DIO2", name, cost); 
        const obj = {name: name, cost: cost};
        fs.appendFileSync("list.json", JSON.stringify(obj) + '\n');
        response.end('Added');
    });
});
*/
app.post("/insert/record", function(request, response)  {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        fs.appendFileSync("list.json", JSON.stringify(obj) + '\n');
        response.end(JSON.stringify("Added"));
    });
});


/*
app.get("/select/record", function(request, response) {
    loadBody(request, function(body) {

        const answer = fs.readFileSync('list.json', 'utf8');
        response.end(answer);
    });
});
*/
function find_cost(car_name){
    let strings = fs.readFileSync("list.json", "utf8");
    strings = strings.split('\n');
    for (let i = 0; i < strings.length-1; i++){
        const obj = JSON.parse(strings[i]);

        if (obj.name === car_name)
            return obj.cost;
    }
    return 0;
}

app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const name = obj.name; 
        const answer = find_cost(name);
        if (answer != 0)
            response.end(JSON.stringify({
                result: answer
            }));
        else
            response.end(JSON.stringify({
                result: "There is no such car"
            }));
    });
});

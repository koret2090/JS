"use strict";
//http://localhost:5002/page1.html
var name = '';
var cost = '';

// импорт библиотек
const express = require("express");
const fs = require("fs");
const request = require("request");

// запускаем сервер
const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

// отправка статических файлов
const way = __dirname;
app.use(express.static(way));

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

app.post("/save/car", function(request, response) {
    name = '';
    cost = '';
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        name = obj["name"];
        cost = obj["cost"];  
        
        sendPost("http://localhost:500/insert/record", JSON.stringify({
            name: name,
            cost: cost
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const answer = answerObject.answer;
            response.end(JSON.stringify({
                result: "New car is added"
            }));
        });
    })
})

app.post("/show/car", function(request, response) {
    name = '';
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        name = obj["name"]; 
        sendPost("http://localhost:500/select/record", JSON.stringify({
            name: name
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const answer = answerObject.result;
            response.end(JSON.stringify({
                result: answer
            }));
        });
    })
})

app.post("/save/warehouse", function(request, response) {
    name = '';
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        sendPost("http://localhost:501/insert/record", JSON.stringify(obj), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const answer = answerObject.result;
            response.end(JSON.stringify({
                result: answer
            }));
        });
    })
})

app.post("/show/warehouse", function(request, response) {
    name = '';
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        console.log("DIO", obj);
        name = obj["name"]; 
        sendPost("http://localhost:501/select/record", JSON.stringify({
            name: name
        }), function(answerString) {
            const answerObject = JSON.parse(answerString);
            const answer = answerObject.result;
            response.end(JSON.stringify({
                result: answer
            }));
        });
    })
})

// функция для отправки POST запроса на другой сервер
function sendPost(url, body, callback) {
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}
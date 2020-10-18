"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// отправка статических файлов
const way = __dirname + "/static";
app.use(express.static(way));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});




// получение суммы чисел
app.get("/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const s = parseInt(a) + parseInt(b);
    response.end(JSON.stringify({
        result: s
    }));
});

// body
function loadBody(request, callback) {
    let body = [];
    const ff2 = request.query.a;
    console.log("FFF", ff2);
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// it is post
app.post("/save/info", function(request, response) {

    console.log("BBB", request.query);
    loadBody(request, function(body) {
        console.log("DODY", body);
        const obj = JSON.parse(body);
        console.log("OBJ", obj);
        const a = obj["mail"];
        const b = obj["surname"];
        const c = obj["phone"];
        
        const mail = request.query.f1;
        const surname = request.query.f2;
        const phone = parseInt(request.query.c);
        console.log("DIO: ", mail, body);
        const contentString = `A: ${mail} B: ${surname} C: ${phone}`;

        // здесь будет ф-ия проверки
        fs.writeFileSync("file.txt", contentString);
        response.end(JSON.stringify({
            result: "Save content ok"
        }));
    });
});
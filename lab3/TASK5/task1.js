"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

let mails = [];
let phone_numbers = [];
load_base();

function load_base(){
    let strings = fs.readFileSync("base.txt", "utf8");
    strings = strings.split('\n');
    for (let i = 0; i < strings.length; i++){
        let string = strings[i].split(',');
        mails.push(string[0]);
        phone_numbers.push(string[1]);
    }
}

function add_to_base(mail, phone){
    let string = mail + ',' + phone + '\n';
    fs.appendFileSync("base.txt", string);
}

function unique_check(mail, number){
    for (let i = 0; i < mails.length; i++){
        if (mail === mails[i] || number === phone_numbers[i]){
            return 0;
        }
    }
    mails.push(mail);
    phone_numbers.push(number);
    return 1;
}



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

// body
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// it is post
app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const mail = obj["mail"];
        const surname = obj["surname"];
        const number = obj["number"];
        
        const contentString = `Mail: ${mail} Surname: ${surname} Phone: ${number}` + '\n';

        // здесь будет ф-ия проверки
        let flag = unique_check(mail, number);
        if (flag){
            add_to_base(mail, number);
            fs.appendFileSync("file.txt", contentString);
            response.end(JSON.stringify({
            result: "SAVED"
        }));
        }
        else{
            response.end(JSON.stringify({
            result: "SAVE ERROR. NOT UNIQUE INFO."
        }));
        }
    });
});
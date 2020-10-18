"use strict";

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

let base = [];
let mails = [];
let phone_numbers = [];
load_base();

function load_base(){
    let strings = fs.readFileSync("base.txt", "utf8");
    strings = strings.split('\n');
    for (let i = 0; i < strings.length; i++){
        let string = strings[i].split(',');
        let obj = {
            mail: string[0],
            surname: string[1],
            number: string[2]
        };
        base.push(obj);
    }
}

function add_to_base(mail, surname, phone){
    let string = mail + ',' + surname + ',' + phone + '\n';
    fs.appendFileSync("base.txt", string);
}

function unique_check(mail, number, surname){
    for (let i = 0; i < base.length; i++){
        if (mail === base[i]["mail"] || number === base[i]["number"]){
            return 0;
        }
    }
    let obj = {
        mail: mail,
        surname: surname,
        number: number
    };
    base.push(obj);

    return 1;
}


function find_by_mail(mail){
    let answer = "Нет пользователя с такой почтой";
    for (let i = 0; i < base.length; i++){
        if (mail === base[i]["mail"]){
            answer = "\nSurname: " + base[i]["surname"] + "\nPhone number: " + base[i]["number"];
            break;
        }
    }
    return answer;
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
        let flag = unique_check(mail, number, surname);
        if (flag){
            add_to_base(mail, surname, number);
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

app.get("/check", function(request, response) {
    const mail_for_info = request.query.mail;
    const ans = find_by_mail(mail_for_info);
    response.end(JSON.stringify({
        result: ans
    }));
});
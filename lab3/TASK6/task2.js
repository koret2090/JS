"use strict";

let users = [
    {login: "login1", password: "pass1", hobby: "hobby1", age: 18},
    {login: "login2", password: "pass2", hobby: "hobby2", age: 19},
    {login: "login3", password: "pass3", hobby: "hobby3", age: 20},
    {login: "login4", password: "pass4", hobby: "hobby4", age: 21},
    {login: "login5", password: "pass5", hobby: "hobby5", age: 22}
]

function info_by_name(login){
    for (let i = 0; i < users.length; i++){
        if (login === users[i]["login"]){  
            return users[i];
        }
    }
    return 0;
}


// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// работа с сессией
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// сохранить cookie
app.get("/api/save", function(request, response) {
    // получаем параметры запроса
    const login = request.query.login;
    const password = request.query.password;
    // контролируем существование параметров
    if(!login) return response.end("Login not set");
    if(!password) return response.end("password not set");
    // выставляем cookie
    request.session.login = login;
    request.session.password = password;
    // отправляем ответ об успехе операции
    response.end("Set cookie ok");
});

// получить cookie
app.get("/api/get", function(request, response) {
    // контролируем существование cookie
    if(!request.session.login) return response.end("Not exists");
    if(!request.session.password) return response.end("Not exists");
    // отправляем ответ с содержимым cookie
    const login = request.session.login;
    const password = request.session.password;
    const obj = info_by_name(login);
    if (obj === 0){
        response.end("Not exists");
    }
    else{
        const hobby = obj["hobby"];
        const age = obj["age"];
        response.end(JSON.stringify({
            login,
            password,
            hobby,
            age
        }));
    }   
});

// удалить все cookie
app.get("/api/delete", function(request, response) {
    request.session = null;
    response.end("Delete cookie ok");
});
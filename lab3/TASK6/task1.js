"use strict";

let games = [
    {name: "game1", description: "description1", age_rating: 0},
    {name: "game2", description: "description2", age_rating: 6},
    {name: "game3", description: "description3", age_rating: 12},
    {name: "game4", description: "description4", age_rating: 16},
    {name: "DOOM", description: "kill demons", age_rating: 18},
    {name: "Witcher3", description: "White wolf barks", age_rating: 18},
];  

function games_by_age_rating(age_rating){
    let selected_games = [];
    for (let i = 0; i < games.length; i++){
        if (games[i]["age_rating"] < age_rating){
            selected_games.push(games[i]);
        }
    }
    return selected_games;
}

// импорт библиотеки
const express = require("express");

// запускаем сервер
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

// активируем шаблонизатор
app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// выдача страницы с массивом учеников
app.get("/games", function(request, response) {
    const age_rating = request.query.age_rating;
    let selected_games = games_by_age_rating(age_rating);
    const info_object = {
        description_value: "Список игр",
        selected_games: selected_games,
    };
    response.render("games.hbs", info_object);
});
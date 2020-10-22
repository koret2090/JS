"use strict";
/*
window.onload = function() {
    // input fields
    const f1 = document.getElementById("car-name-id2");

    // button
    const btn = document.getElementById("find-btn");

    // label
    const label = document.getElementById("car-cost-id2");

    // ajax get
    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    };

    // click event
    btn.onclick = function() {
        const name = f1.value;
        const url = `/sum?a=${a}&b=${b}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`;
        });
    };
};
*/












function ajaxPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(bodyString);
    r.onload = function() {
    callback(r.response);
    }
}

function add_car(){
    const car_name = document.getElementById('car-name-id');
    const car_cost = document.getElementById('car-cost-id');
    const name = car_name.value;
    const cost = car_cost.value;

    ajaxPost("/save/car", JSON.stringify({
        name, cost
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        alert(result);
    });
}

function show_car(){
    const car_name = document.getElementById('car-name-id2');
    const name = car_name.value;
    let cost_lbl = document.getElementById('car-cost-id2');

    ajaxPost("/show/car", JSON.stringify({
        name
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        cost_lbl.innerHTML = result;
        //alert(result);
    });
}

function add_warehouse(){
    const warehouse_name = document.getElementById('warehouse-name-id');
    const cars_models = document.getElementById('models-id');
    const name = warehouse_name.value;
    let cars = cars_models.value;
    cars = cars.split(' ');

    ajaxPost("/save/warehouse", JSON.stringify({
        name, cars
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        alert(result);
    });
}

function show_warehouse(){
    const warehouse_name = document.getElementById('warehouse-name-id2');
    const name = warehouse_name.value;
    let content_lbl = document.getElementById('warehouse-info-id');

    ajaxPost("/show/warehouse", JSON.stringify({
        name
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        content_lbl.innerHTML = result;
        //alert(result);
    });
}
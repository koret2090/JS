"use strict";

function ajaxPost(urlString, bodyString, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", urlString, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(bodyString);
    r.onload = function() {
    callback(r.response);
    }
}

function makeAction() {
    
    const f1 = document.getElementById("f1");
    const f2 = document.getElementById("f2");
    const f3 = document.getElementById("f3");
    const mail = f1.value;
    const surname = f2.value;
    const number = parseInt(f3.value);

    ajaxPost("/save/info", JSON.stringify({
        mail, surname, number
    }), function(answerString) {
        const answerObject = JSON.parse(answerString);
        const result = answerObject.result;
        alert(result);
    });
}



"use strict";

window.onload = function() {
    // input field
    const mail_input = document.getElementById("mail");

    // button
    const btn = document.getElementById("check-mail-btn");

    // label
    const label = document.getElementById("result-label");

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
        const mail = mail_input.value;
        
        const url = `/check?mail=${mail}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `${result}`;
        });
    };
};
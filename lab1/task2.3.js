"use strict";

let seconds = 0;
let flag = 1;

let delay = 2000;  


function tick(){
    seconds++;
    let message = "Seconds: " + seconds;
    console.log(message);

    if (seconds === 10 && flag === 1) {
        flag = 2;
        delay = 1000;
        }
    else if (seconds === 20 && flag === 2) {
        flag = 3;
        delay = 2000;
        seconds = 0;
    }
    else if (seconds === 10 && flag === 3) {
        flag = 4;
        delay = 1000;
    }
    else if (seconds === 20 && flag === 4) {
        flag = 1;
        delay = 2000;
    }
    setTimeout(() => {
        tick();
        
    }, delay);
}

tick();


var player1 = document.getElementById("btnP1");
var player2 = document.getElementById("btnP2");
var player3 = document.getElementById("btnP3");
var player4 = document.getElementById("btnP4");

var btn1_pressed = 0;
var btn2_pressed = 0;
var btn3_pressed = 0;
var btn4_pressed = 0;

var players_selected = 0;


$(document).ready(function () {
    $('#btnP1').click(function() {
        if(btn1_pressed === 0) {
            btn1_pressed = 1;
            players_selected ++;
            console.log("worked");
        } else if(btn1_pressed === 1) {
            btn1_pressed = 0;
            if (players_selected > 0 && players_selected < 3) {
                players_selected --;
                console.log("worked");
            }
        } else {
            alert("Fehler bei Button 1!!");
            console.log("worked");
            console.log("worked");
        }
    });
    $('#btnP2').click(function() {
        if(btn2_pressed === 0) {
            btn2_pressed = 1;
            players_selected ++;
            console.log("worked");
        } else if(btn2_pressed === 1) {
            btn2_pressed = 0;
            if (players_selected > 0 && players_selected < 3) {
                players_selected --;
            console.log("worked");
            }
        } else {
            alert("Fehler bei Button 2!!");
            console.log("worked");
        }
    });
    $('#btnP3').click(function() {
        if(btn3_pressed === 0) {
            btn3_pressed = 1;
            players_selected ++;
            console.log("worked");
        } else if(btn3_pressed === 1) {
            btn3_pressed = 0;
            if (players_selected > 0 && players_selected < 3) {
                players_selected --;
            console.log("worked");
            }
        } else {
            alert("Fehler bei Button 3!!");
            console.log("worked");
        }
    });
    $('#btnP4').click(function() {
        if(btn4_pressed === 0) {
            btn4_pressed = 1;
            players_selected ++;
            console.log("worked");
        } else if(btn4_pressed === 1) {
            btn4_pressed = 0;
            if (players_selected > 0 && players_selected < 3) {
                players_selected --;
            console.log("worked");
            }
        } else {
            alert("Fehler bei Button 4!!");
            console.log("worked");
        }
    });

    $('#startGame').click(function() {
        if (players_selected === 2) {
            //GO
            console.log("worked");
        } else if (players_selected === 1) {
            alert("Du hast erst einen von zwei Spielern ausgewählt!");
            console.log("worked");
        } else {
            alert("Du hast noch keinen spieler ausgewählt!");
            console.log("worked");
        }
    })

});
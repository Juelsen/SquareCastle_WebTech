var btnpressed = [];
btnpressed[0] = false;
btnpressed[1] = false;
btnpressed[2] = false;
btnpressed[3] = false;

var player1Color = [];
player1Color[0] = false;
player1Color[1] = false;
player1Color[2] = false;
player1Color[3] = false;

var player2Color = [];
player2Color[0] = false;
player2Color[1] = false;
player2Color[2] = false;
player2Color[3] = false;

$(document).ready(function () {
    $('#btnP1').click(function() {
        btnpressed[0] = !btnpressed[0];
    });
    $('#btnP2').click(function() {
        btnpressed[1] = !btnpressed[1];
    });
    $('#btnP3').click(function() {
        btnpressed[2] = !btnpressed[2];
    });
    $('#btnP4').click(function() {
        btnpressed[3] = !btnpressed[3];
    });
    $('#startGame').click(function() {
        if(btnpressed.filter(Boolean).length === 2){
            var temp = 0;
            var indices = [];
            for(var i = 0; i < btnpressed.length; i++){
                if(btnpressed[i]){
                    indices[temp] = i;
                    temp++;
                }
            }
            console.log("indices: "+indices);
            var payload = {
                "instruction": "setPlayers",
                "x": indices[0],
                "y": indices[1]
            };

            if (indices[0] === 0){
                player1Color[0] = true;
            } else if (indices[0] === 1) {
                player1Color[1] = true;
            } else if (indices[0] === 2) {
                player1Color[2] = true;
            } else if (indices[0] === 3) {
                player1Color[3] = true;
            }

            if (indices[1] === 0){
                player2Color[0] = true;
            } else if (indices[1] === 1) {
                player2Color[1] = true;
            } else if (indices[1] === 2) {
                player2Color[2] = true;
            } else if (indices[1] === 3) {
                player2Color[3] = true;
            }

            sendRequest("POST","/squarecastle/api/command", payload)
            document.body.style.cursor="progress";
            setTimeout(function () {
                location = "/squarecastle";

            },1000);
        } else if(btnpressed.filter(Boolean).length === 1){
            alert("Du hast nur einen spieler ausgewählt!");
        } else {
            alert("Du hast noch keinen spieler ausgewählt!");
        }
    });
    //($('#selectedPlayer1').removeAllClasses("");
    //$('#selectedPlayer2').removeAllClasses("");


    if (player1Color[0] === true){
        $('#selectedPlayer1').addClass("blue-player");
    } else if (player1Color[1] === true) {
        $('#selectedPlayer1').addClass("red-player");
    } else if (player1Color[2] === true) {
        $('#selectedPlayer1').addClass("green-player");
    } else if (player1Color[3] === true) {
        $('#selectedPlayer1').addClass("purple-player");
    }

    if (player2Color[0] === true){
        $('#selectedPlayer2').addClass("blue-player");
    } else if (player2Color[1] === true) {
        $('#selectedPlayer2').addClass("red-player");
    } else if (player2Color[2] === true) {
        $('#selectedPlayer2').addClass("green-player");
    } else if (player2Color[3] === true) {
        $('#selectedPlayer2').addClass("purple-player");
    }
});

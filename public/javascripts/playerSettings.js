var btnpressed = [];
btnpressed[0] = false;
btnpressed[1] = false;
btnpressed[2] = false;
btnpressed[3] = false;

$(document).ready(function () {
    $('#btnP1').click(function() {
        btnpressed[0] = !btnpressed[0];
        selectplayer();
    });
    $('#btnP2').click(function() {
        btnpressed[1] = !btnpressed[1];
        selectplayer();
    });
    $('#btnP3').click(function() {
        btnpressed[2] = !btnpressed[2];
        selectplayer();
    });
    $('#btnP4').click(function() {
        btnpressed[3] = !btnpressed[3];
        selectplayer();
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


});
var count = 0;

function selectplayer() {
    let selectedone = 0;
    let selected = [];
    let selector1 = document.getElementById("p1Selected");
    let selector2 = document.getElementById("p2Selected");
    if (btnpressed.filter(Boolean).length >= 2)
        return
    selector1.classList.remove("noneSelected");
    selector1.classList.remove("greenSelected");
    selector1.classList.remove("blueSelected");
    selector1.classList.remove("redSelected");
    selector1.classList.remove("purpleSelected");
    selector2.classList.remove("noneSelected");
    selector2.classList.remove("greenSelected");
    selector2.classList.remove("blueSelected");
    selector2.classList.remove("redSelected");
    selector2.classList.remove("purpleSelected");
    if (btnpressed.filter(Boolean).length === 0) {
        selector1.classList.add("noneSelected");
        selector2.classList.add("noneSelected");
        return;
    }
    if (btnpressed.filter(Boolean).length === 1) {
        for (var i = 0; i++; i < btnpressed.length) {
            if (btnpressed[i])
                selectedone = i;
        }
        if (selectedone === 0)
            selector1.classList.add("blueSelected");
        if (selectedone === 1)
            selector1.classList.add("redSelected");
        if (selectedone === 2)
            selector1.classList.add("greenSelected");
        if (selectedone === 3)
            selector1.classList.add("purpleSelected");
        selector2.classList.add("noneSelected");
        return;
    }
    let count = 0;
    if (btnpressed.filter(Boolean).length === 2) {
        for (var i = 0; i++; i < btnpressed.length) {
            if (btnpressed[i]) {
                selected[count] = i;
                count++;
            }
        }
        if (selected[0] === 0)
            selector1.classList.add("blueSelected");
        if (selected[0] === 1)
            selector1.classList.add("redSelected");
        if (selected[0] === 2)
            selector1.classList.add("greenSelected");
        if (selected[0] === 3)
            selector1.classList.add("purpleSelected");
        if (selected[1] === 0)
            selector2.classList.add("blueSelected");
        if (selected[1] === 1)
            selector2.classList.add("redSelected");
        if (selected[1] === 2)
            selector2.classList.add("greenSelected");
        if (selected[1] === 3)
            selector2.classList.add("purpleSelected");
    }
}
var btnpressed = [];
btnpressed[0] = false;
btnpressed[1] = false;
btnpressed[2] = false;
btnpressed[3] = false;

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
            const indices = btnpressed.reduce(
                (out, bool, index) => bool ? out.concat(index) : out,
                []
            )
            console.log("indices: "+indices);
            var payload = {
                "instruction": "setPlayers",
                "x": indices[0],
                "y": indices[1]
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
    })

});
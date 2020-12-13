var Data = {};
var clickedX = -1;
var clickedY = -1;
var instruction = "";
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


$(document).ready(function() {
  connectWebSocket();
});
var websocket = new WebSocket("ws://localhost:9000/websocket");

function calc(source){
  if(lock)
    return
  var payload = {
    "instruction": source.getAttribute("instruction"),
    "x": source.getAttribute("x"),
    "y": source.getAttribute("y")
  }
  clickedX = source.getAttribute("x");
  clickedY = source.getAttribute("y");
  instruction = source.getAttribute("instruction");
  //websocket.send(JSON.stringify(payload))
  sendRequest("POST","/squarecastle/api/command", payload)
}

function sendRequest(meth, path, payload){
  var request = $.ajax({
    method: meth,
    url: path,
    data: JSON.stringify(payload),
    dataType: "json",
    contentType: "application/json",
    success: function(JsonAr){
      readJson(JsonAr)
    }
  });

}
function readJson(json){
  Data[0] = json[0].replaceAll('"',"");
  Data[1] = json[1].replaceAll('"',"");
  Data[2] = json[2].replaceAll('"',"");
  Data[3] = json[3].replaceAll('"',"");
  Data[4] = json[3].replaceAll('"',"");
  Data[5] = json[3].replaceAll('"',"");

  updateHTML()
}
var turned=0;
function updateHTML(){
  console.log("State : " + Data[0])
  if(Data[0] === "2"){
    console.log("turn picture");
    console.log(turned);

    switch (instruction) {
      case "r":
        turned += 90;
        document.getElementById("preview").style.transform = 'rotate('+turned+'deg)';
        break;
      case "l":
        turned -= 90;
        document.getElementById("preview").style.transform = 'rotate('+turned+'deg)';
        break;
      case "wait":
        break;
      default:
        console.log("Instruction not readable "+ instruction);
    }
  }
  else if(Data[0] === "1") {
    turned = 0;
    //animateImg(0);
    console.log("new Picture");
    document.getElementById("newcard").innerHTML = '<img id="preview" class="card-preview" src="/assets/' + Data[1] + '">'
    document.getElementById(clickedX + " " + clickedY).innerHTML = '<img src="/assets/' + Data[2] + '">'
  }

}
function startgame(){
  //animateImg(0);
}
var animationindex = 0;
var lock = false;
function animateImg(index){
  animationindex = index;
  lock = true;
  document.getElementById('animateImg'+animationindex).style.transition = "right 2s";
  document.getElementById('animateImg'+index).style.transitionTimingFunction = "cubic-bezier(1,.55,.95,1.22)"
  document.getElementById('animateImg'+index).style.right = 'calc(50%)'
  setTimeout(endanimation, 2000);
}
function endanimation(){
  lock = false;
  setTimeout(easeout, 500);

}
function easeout(){
  document.getElementById('animateImg'+animationindex).style.transition = "right 0.75s";
  document.getElementById('animateImg'+animationindex).style.right = 'calc(100% + 1200px)';

}
function connectWebSocket() {
  console.log("Connecting to Websocket");
  console.log("Connected to Websocket");

  websocket.onopen = function(event) {
    console.log("Trying to connect to Server");
  }

  websocket.onclose = function () {
    console.log('Connection Closed!');
    //$(".game").addClass("blurred");
  };

  websocket.onerror = function (error) {
    console.log('Error Occured: ' + error);
  };

  /**
   * Event when message is received from websocket
   * Updates the game
   * @param {*} e : received event
   */
  websocket.onmessage = function (e) {

    }
}
var Data = {};
var clickedX = -1;
var clickedY = -1;

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


function calc(source){
  console.log("click")
  var payload = {
    "x": source.getAttribute("x"),
    "y": source.getAttribute("y")
  }
  clickedX = source.getAttribute("x");
  clickedY = source.getAttribute("y");
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
  request.done(function(JsonAr) {
    readJson(JsonAr)
  });
}
function readJson(json){
  Data[0] = json[0].replaceAll('"',"");
  Data[1] = json[1].replaceAll('"',"");
  Data[2] = json[2].replaceAll('"',"");
  Data[3] = json[3].replaceAll('"',"");

  updateHTML()
}
function updateHTML(){
  if(Data[0] !== 2) {
    document.getElementById("newcard").innerHTML = '<img class="card-preview" src="/assets/' + Data[1] + '">'
    document.getElementById(clickedX + " " + clickedY).innerHTML = '<img src="/assets/' + Data[2] + '">'
  }//andere Daten setzen
}

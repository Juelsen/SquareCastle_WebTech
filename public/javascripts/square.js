var Controller = {};

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
  sendRequest("POST","/squarecastle/api/command", payload)
}

function sendRequest(meth, path, payload){
  var request = $.ajax({
    method: meth,
    url: path,
    data: JSON.stringify(payload),
    dataType: "json",
    contentType: "application/json",
    success: function(JsonController){
      Controller = JSON.parse(JsonController);
      console.log(Controller.valueOf("playersturn"));
      updateHTML()
    }
  });
  request.done(function(JsonController) {
    Controller = JSON.parse(JsonController);
    updateHTML()
  });
}
function updateHTML(){
  document.getElementById("5 5").innerHTML = "Kotbatzen"
  for(let x = 0; x < 6; x++){
    document.getElementById("")

  }
}

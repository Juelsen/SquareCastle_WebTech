function addclicklistener(id){
    $(id).click(function (){
        calc(id)
    })
}

function calc(str){
    console.log("click")
    if(!str.includes("squarecastle"))
        str = "squarecastle/" + str;
    location.href = "/"+str;
}
$( document ).ready(function (){
    addclicklistener();
})
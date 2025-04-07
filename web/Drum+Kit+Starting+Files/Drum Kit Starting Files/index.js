
for(var i=0;i<document.querySelectorAll(".drum").length;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",handleClick);
}


//we are passing the function as an input so that the function will be called after the "click" happens..not before that

function handleClick(){
    alert("I got clicked!");
}
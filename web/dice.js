var randomNumber1=Math.floor(Math.random()*6)+1;
var randomDice1="dice"+randomNumber1+".png";
var randomImgsource1="images/"+randomDice1;

var image1=document.querySelectorAll("img")[0];
image1.setAttribute("src",randomImgsource1);

var randomNumber2=Math.floor(Math.random()*6)+1;
var randomImgsource2="images/dice"+randomNumber2+".png";

var image2=document.querySelectorAll("img")[1].setAttribute("src",randomImgsource2);

if(randomNumber1>randomNumber2){
    document.querySelector("h1").innerHTML="Player 1 Wins!";
}
else if(randomNumber2>randomNumber1){
    document.querySelector("h1").innerHTML="Player 2 Wins!";
}
else{
    document.querySelector("h1").innerHTML="It's A Draw!";
}

var	Game = require("./game.js");


let startBtn = document.querySelector(".introduction_btn");
const gameContainer = document.querySelector(".game1");
const arrowDiv = document.querySelectorAll(".arrows_item");

gameContainer.style.display = "none";

startBtn.addEventListener("click", function(){

    document.querySelector(".introduction").style.display = "none";
    gameContainer.style.display = "block";
    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();

    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });

    arrowDiv[0].addEventListener('click', function() {
        game.turnFurryLeft();
    });
    arrowDiv[1].addEventListener('click', function() {
        game.turnFurryRight();
    });
    arrowDiv[2].addEventListener('click', function() {
        game.turnFurryTop();
    });
    arrowDiv[3].addEventListener('click', function() {
        game.turnFurryBottom();
    });

});



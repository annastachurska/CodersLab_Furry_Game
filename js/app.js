var	Game = require("./game.js");


let startBtn = document.querySelector(".introduction_btn");
const gameContainer = document.querySelector(".game1");

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

});



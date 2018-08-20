var	Coin = require("./coin.js");
var	Furry = require("./furry.js");

var Game = function() {
    this.board = document.querySelectorAll("section#board div"),
        this.furry = new Furry(),
        this.coin = new Coin(),
        this.score = 0,

        this.index = function(x, y) {
            return x + (y * 10);
        },

        this.showFurry = function() {
            this.hideVisibleFurry();
            this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
        },

        this.hideVisibleFurry = function() {
            var currentFurry = document.querySelector(".furry");
            if (currentFurry != null) {
                currentFurry.classList.remove("furry");
            }
        },

        this.showCoin = function() {
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
        },

        this.moveFurry = function() {
            if(this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "top") {
                this.furry.y = this.furry.y - 1;
            } else if (this.furry.direction === "bottom") {
                this.furry.y = this.furry.y + 1;
            }
            this.gameOver();
            this.showFurry();
            this.checkCoinCollision();
        },

        this.turnFurry = function(event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'top';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'bottom';
                    break;
            }
        },

        this.checkCoinCollision = function() {
            if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
                document.querySelector(".coin").classList.remove("coin");
                this.score += 1;
                document.querySelector("section#score strong").innerText = this.score;
                this.coin = new Coin();
                this.showCoin();
            }
        },

        this.gameOver = function() {
            if ((this.furry.x < 0) || (this.furry.x > 9) || (this.furry.y < 0) || (this.furry.y > 9)) {
                clearInterval(this.idSetInterval);
                this.hideVisibleFurry();
                var final = document.querySelector("section#score strong").innerText;
                document.querySelector("section#score strong").innerText = "Game over: " + final;
                if (this.furry.x > 9) {this.furry.x = 9;}
                if (this.furry.y > 9) {this.furry.y = 9;}
                if (this.furry.x < 0) {this.furry.x = 0;}
                if (this.furry.y < 0) {this.furry.y = 0;}
            }
        },

        this.startGame = function() {
            var self = this;
            this.idSetInterval = setInterval(function() {
                self.moveFurry();
            }, 250);
        }
}

module.exports = Game;
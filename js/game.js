var	Coin = require("./coin.js");
var	Furry = require("./furry.js");

var Game = function() {
    this.board = document.querySelectorAll("section#board div"),
    this.carTable = [];
    this.furry = new Furry(),
    this.coin = new Coin(),
    this.score = 0,
    this.originalCarTable = ["aston-martin", "bugatti", "chrysler", "dodge", "dodge-viper", "dodge-viper-2", "ferrari",
        "ford-gt", "ford-gt-2", "ford-mustang", "ford-puma", "hyundai-coupe", "lamborghini", "lexus", "lotus", "mazda",
        "mercedes", "mitsubishi-lancer", "opel", "pagani", "porsche", "saleen", "sport-car", "spyker", "subaru",
        "suzuki", "toyota-gt-one"],

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
        let number = Math.floor(Math.random()*this.originalCarTable.length);
        let link = `url('./images/${this.originalCarTable[number]}.png')`;
        document.querySelector(".coin").style.backgroundImage = link;
        this.carTable.push(link);
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
            document.querySelector(".coin").style.backgroundImage = "";
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

            let table = this.carTable;

            setTimeout(function() {
                document.querySelector(".game1").style.display = "none";
                document.querySelector("#over").style.display = "block";
                document.querySelector("#over .score").innerText = final;
                let container = document.querySelector(".carCollector");
                for (let i=0; i<table.length-1; i++) {
                    let imgEl = document.createElement("img");
                    let link2 = table[i];
                    imgEl.classList.toggle('imageElement');
                    imgEl.style.backgroundImage = link2;
                    container.appendChild(imgEl);
                }
            }, 2000);
        }
    },

    this.startGame = function() {
        var self = this;
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    }
};

module.exports = Game;
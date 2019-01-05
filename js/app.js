function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);

}

function Game() {
    this.board = document.querySelectorAll('#board > div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var scoreboard = document.querySelector('#score strong');
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showFurry = function showFurry() {
        this.hideVisibleFurry();
        if (this.board[this.index(this.furry.x, this.furry.y)]) {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        }
    };
    this.hideVisibleFurry = function () {
        if (document.querySelector('.furry')) {
            document.querySelector('.furry').classList.remove('furry');
        }
    };
    this.showCoin = function showCoin() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector('.coin').classList.remove('coin');
            this.score += 1;
            scoreboard.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
        }
    };

    this.moveFurry = function () {
        if (this.furry.direction === 'right') {
            this.furry.x += 1;
        } else if (this.furry.direction === 'down') {
            this.furry.y += 1;
        } else if (this.furry.direction === 'left') {
            this.furry.x -= 1;
        } else if (this.furry.direction === 'up') {
            this.furry.y -= 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };

    var self = this;
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };
}

var game = new Game();
game.showFurry();
game.showCoin();
document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});
game.startGame(game.moveFurry());

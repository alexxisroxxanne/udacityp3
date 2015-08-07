// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set the enemy initial location
    this.x = x;
    this.y = y;

    // Set the enemy speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // Update the enemy location
    var rightEdge = 500;
    if (this.x > rightEdge) {
        this.x = -50;
        this.setNewSpeed();
    }

    // Handle collision with player
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemies in screen
Enemy.prototype.setNewSpeed = function() {
    var randomSpeedMult = Math.random() * (5 - 1 + 1) + 1;
    this.speed = randomSpeedMult * 100;
};

Enemy.prototype.checkCollisions = function() {
    var yDiff = this.y - player.y;
    var xDiff = this.x - player.x;

    if (yDiff > -20 && yDiff < 20)
    { 
        if (xDiff > -50 && xDiff < 50)
            player.die();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.score = 0;
    this.displayScore();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {
    // make sure game is moving at same speed
};

Player.prototype.handleInput = function(key) {
    // move player based on keyboard input
    var leftbound = -2;
    var rightbound = 402;
    var top = 68;
    var bottom = 400;

    if (key === 'left')
    {
        if (this.x == leftbound)
            this.x = this.x;
        else
            this.x -= 101;
    }
    if (key === 'right')
    {
        if (this.x == rightbound)
            this.x = this.x;
        else
            this.x += 101;
    }
    if (key === 'up')
    {
        if (this.y == top)
            this.win();
        else
            this.y -= 83;
    }
    if (key === 'down')
    {
        if (this.y == bottom)
            this.y = this.y;
        else
            this.y += 83;
    }
};

// Reset player location
Player.prototype.resetLocation = function() {
    this.x = 200;
    this.y = 400;
};

// Increase score and reset player when player wins
Player.prototype.win = function() {
    this.score++;
    this.resetLocation();
    this.displayScore();
};

Player.prototype.die = function() {
    this.score--;
    this.resetLocation();
    this.displayScore();
};

Player.prototype.displayScore = function() {
    var scoreString = "Score: " + this.score.toString();
    // var scoreText = document.getElement
    document.querySelector("#score").innerHTML = scoreString;
    // ctx.strokeText(scoreString, 400, 10);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy;
for (var i = 0; i < 3; i++) {
    var x = 0;
    var y = 60;
    var speed = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    enemy = new Enemy(x, y + 83 * i, speed);
    allEnemies.push(enemy);
}

var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
    Frogger - Classic Arcade Game Clone (Udacity P. #3)
    ---------------------------------------------------
    Alexxis Johnson - Aug. 8th, 2015
    -----------------------------------
    app.js adds functionality to the files and engine provided by
    resources.js and engine.js
    This file defines and creates the player and the enemies in the
    game, handles user input (moving the player with the keys) and
    updates the score
*/



/*
    Enemy creates bugs that our player must avoid
    - takes params x and y for initial locations and speed variable for
    traveling speed
*/
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

/*
 Update the enemy's position, required method for game
 Parameter: dt, a time delta between ticks
*/
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

// Determine random new speed for enemies when reappearing on screen
Enemy.prototype.setNewSpeed = function() {
    var randomSpeedMult = Math.random() * (5 - 1 + 1) + 1;
    this.speed = randomSpeedMult * 100;
};

// Check if enemy and player have colliding; kill player if they have
Enemy.prototype.checkCollisions = function() {
    var yDiff = this.y - player.y;
    var xDiff = this.x - player.x;

    if (yDiff > -20 && yDiff < 20)
    { 
        if (xDiff > -50 && xDiff < 50)
            player.die();
    }
};


/*
    Player creates the user's player character
    Parameters x and y set the players initial location
*/
var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.score = 0;
    this.displayScore();
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update game; dt is parameter for delta time
Player.prototype.update = function(dt) {
    // works with empty function
};

// Handle user input via the arrow keys in key parameter
Player.prototype.handleInput = function(key) {
    // define player bounds
    var leftbound = -2;
    var rightbound = 402;
    var top = 68;
    var bottom = 400;

    // move player, but keep character in bounds
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

// Reset player location to initial location
Player.prototype.resetLocation = function() {
    this.x = 200;
    this.y = 400;
};

// Increase score and reset player location when player wins
Player.prototype.win = function() {
    this.score++;
    this.resetLocation();
    this.displayScore();
};

// Decrease score and reset player location when player dies
Player.prototype.die = function() {
    this.score--;
    this.resetLocation();
    this.displayScore();
};

// Display player's score at top of screen
Player.prototype.displayScore = function() {
    var scoreString = "Score: " + this.score.toString();
    document.querySelector("#score").innerHTML = scoreString;
};



// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy;
for (var i = 0; i < 3; i++) {
    var x = 0;
    var y = 60;
    var speed = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    enemy = new Enemy(x, y + 83 * i, speed);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player(200, 400);


// Listen for key presses and send input to handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

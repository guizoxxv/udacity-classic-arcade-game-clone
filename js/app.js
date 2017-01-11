// Set starting level 1
var level = 1;

// Array of posible y position for enemies
var yArray = [41.5, 124.5, 207.5];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set enemy x start position
    this.x = 0;
    // Set enemy position to random value on yArray
    this.y = yArray[Math.floor(Math.random() * yArray.length)];
    // Set enemy velocity to random value between 10 and 30 and multiply by the level to increase difficulty
    this.veloc = Math.floor((Math.random() * 30) + 10) * level;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.veloc * dt);

    // Refresh enemy when it reaches the canvas extrem right
    if (this.x > 504) {
      // Set enemy x start position
      this.x = 0;
      // Set enemy position to random value on yArray
      this.y = yArray[Math.floor(Math.random() * yArray.length)];
      // Set enemy velocity to random value between 10 and 30 and multiply by the level to increase difficulty
      this.veloc = Math.floor((Math.random() * 30) + 10) * level;
    }

    // Check if enemy hit player
    // A hit occurs when the enemy position is at the same time between the player x and y position.
    // It is necessary to add a value to player.x and player.y in order to check for a hit on the boundaries of the player image
    if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y > player.y - 75 && this.y < player.y + 75)) {
        // initial player position
        player.x = 202;
        player.y = 373.5;
        // return to level 1 when player get hit
        level = 1;
    }

    // Display the level variable value to .level span when update
    document.querySelector('.level span').innerHTML = level;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // initial player position
    this.x = 202;
    this.y = 373.5;

    // player image
    this.sprite = 'images/char-boy.png';

};

Player.prototype.handleInput = function(keyPress) {
    // Change position according to input keyPress. if statments only allows movement inside canvas bounderies.
    switch (keyPress) {
        case 'up':
            this.y = this.y - 83;
            if (player.y < 0) {
              this.x = 202;
              this.y = 373.5;
              level++;
              // console.log(level);
            }
            break;
        case 'down':
            if (this.y < 373.5) {
                this.y = this.y + 83;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x = this.x + 101;
            }
            break;
    }
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
var player = new Player();

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

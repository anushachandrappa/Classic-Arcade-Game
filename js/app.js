var winBox = document.querySelector(".win-text");

// HTML text template to add when winning the game
var winHTML = `<h3>You Made It!</h3>
                <p>Play Again?</p>
            <button id="reload" name="replay" type="button">Start</button>`;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 550) {
    this.x = 0;
    this.speed = 100 + Math.floor(Math.random() * 512);
  }

  //check for collisions between enemies and player
  if (player.x < this.x + 650 &&
    player.x + 37 > this.x &&
    player.y < this.y + 25 &&
    30 + player.y > this.y) {
    player.x = 200;
    player.y = 380;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // a handleInput() method.

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
  if (this.y > 380) {
    this.y = 380;
  }

  if (this.x > 400) {
    this.x = 400;
  }

  if (this.x < 0) {
    this.x = 0;
  }

  /*if(this.y<0){
    this.x=200;
    this.y=380;
  }*/

  player.playerWin();
};

// method that takes action when player wins
Player.prototype.playerWin = function() {
  if (this.y < 0) {
    allEnemies = [];
    //this.x = 200;
    //this.y = 380;
    winBox.innerHTML = winHTML;

    // variable for the reset button
    var resetButton = document.querySelector("#reload");

    // Event listener for the reset button
    resetButton.addEventListener('click', reset, true);
  } else {
    return;
  }
}

// function to reset the game
function reset() {
  window.location.reload(true);
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keypress) {
  switch (keypress) {
    case 'left':
      this.x -= this.speed + 50;
      break;
    case 'up':
      this.y -= this.speed + 30;
      break;
    case 'right':
      this.x += this.speed + 50;
      break;
    case 'down':
      this.y += this.speed + 30;
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
  enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
  allEnemies.push(enemy);
});



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

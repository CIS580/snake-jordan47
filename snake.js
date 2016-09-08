/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();

var userScore = 0;

var snake = {
  x: Math.floor(Math.random() * backBuffer.width),
  y: Math.floor(Math.random() * backBuffer.height),
  width: 10,
  height: 10
}

var snakeX = new Array();
var snakeY = new Array();

var food = {
  x:Math.floor(Math.random() * backBuffer.width),
  y:Math.floor(Math.random() * backBuffer.height),
  width:10,
  height:10
}

//variable to hold the current input
var input = {
	up: false,
	down: false,
	left: false,
	right: false
}

//holds the previous input so you cant make 180 degree turns
var lastInput = {
  up: false,
	down: false,
	left: false,
	right: false
}

function resetInput()
{
  input.up = false;
  input.down = false;
  input.left = false;
  input.right = false;
}

function clearLastInput()
{
  lastInput.up = false;
  lastInput.down = false;
  lastInput.left = false;
  lastInput.right = false;
}


// Movement Code From in-class lightbike assignment
window.onkeydown = function(event)
{
  resetInput();
	console.log(event.keyCode);
	switch(event.keyCode)
	{
		//UP
		case 38:
		case 87:
			input.up = true;
			break;
		//LEFT
		case 37:
		case 65:
			input.left = true;
			break;
		//DOWN
		case 40:
		case 83:
			input.down = true;
			break;
		//Right
		case 39:
		case 68:
			input.right = true;
			break;
		
	}
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) 
{
  var elapsedTime = newTime - oldTime;

  update(elapsedTime);
  render(elapsedTime);

  frontCtx.clearRect(0, 0, frontBuffer.width, frontBuffer.height);
  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) 
{

  // Move the snake
  if(input.up) 
  {
    if(!lastInput.down)
    {
      snake.y -= 2;
      clearLastInput();
      lastInput.up = true;
    }
    else if(lastInput.down) snake.y += 2;
  }
	else if(input.down) 
  {
    if(!lastInput.up)
    {
      snake.y += 2;
      clearLastInput();
      lastInput.down = true;
    }
    else if(lastInput.up) snake.y -= 2;
  }
	else if(input.left) 
  {
    if(!lastInput.right)
    {
      snake.x -= 2; 
      clearLastInput();
      lastInput.left = true;
    }
    else if(lastInput.right) snake.x += 2;
  }
	else if(input.right) 
  {
    if(!lastInput.left)
    {
      snake.x += 2;      
      clearLastInput();
      lastInput.right = true;
    }
    else if(lastInput.left) snake.x -= 2;
  }

  snakeX.unshift(snake.x);
  snakeY.unshift(snake.y);

  if(snakeX.length > 1)
  {
    snakeX.pop();
    snakeY.pop();
  }
  


  // Determine if the snake has moved out-of-bounds (offscreen)
  if(snake.x < backBuffer.width &&
   snake.x + snake.width > backBuffer.width ||
   snake.y < backBuffer.height &&
   snake.y + snake.height > backBuffer.height || 
   snake.x > 0 &&
   snake.x - snake.width + 7 < 0 ||
   snake.y > 0 &&
   snake.y - snake.height + 7 < 0)
   {
     resetGame();
   }

  // Determine if the snake has eaten an apple
  if(snake.x < food.x + food.width &&
   snake.x + snake.width > food.x &&
   snake.y < food.y + food.height &&
   snake.height + snake.y > food.y)
   {
     userScore + 10;
     food.x = Math.floor(Math.random() * backBuffer.width);
     food.y = Math.floor(Math.random() * backBuffer.height);
     for(i = 0;i<5;i++)
     {
       snakeX.push(snakeX[snakeX.length]);
       snakeY.push(snakeY[snakeY.length]);
     }
   }

  // TODO: Determine if the snake has eaten its tail
  for(i = 20;i < snakeX.length; i++)
  {
   if(snake.x < snakeX[i] + snake.width &&
   snake.x + snake.width > snakeX[i] &&
   snake.y < snakeY[i] + snake.height &&
   snake.height + snakeY[i] > snake.y)
   {
     resetGame();
   }
  }
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) 
{
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);

  backCtx.fillStyle = "red";
  backCtx.fillRect(food.x,food.y, food.width, food.height);

  // TODO: Draw the game objects into the backBuffer
  backCtx.fillStyle = "green";
  var tempSanke
  for(i = 0;i<snakeX.length;i++)
  {
      backCtx.fillRect(snakeX[i],snakeY[i], snake.width, snake.height)
  }

}

function resetGame()
{
  snake.x = Math.floor(Math.random() * backBuffer.width);
  snake.y = Math.floor(Math.random() * backBuffer.height);
  snakeX = new Array();
  snakeY = new Array();
  resetInput();
  clearLastInput();
  food.x = Math.floor(Math.random() * backBuffer.width);
  food.y = Math.floor(Math.random() * backBuffer.height);
}

/* Launch the game */
window.requestAnimationFrame(loop);
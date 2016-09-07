/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();

var x = 0, y = 0;


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

// TODO: Spawn an apple periodically

// TODO: Grow the snake periodically

// Move the snake
  if(input.up) 
  {
    if(!lastInput.down)
    {
      y -= 1;
      clearLastInput();
      lastInput.up = true;
    }
    else if(lastInput.down) y += 1;
  }
	else if(input.down) 
  {
    if(!lastInput.up)
    {
      y += 1;
      clearLastInput();
      lastInput.down = true;
    }
    else if(lastInput.up) y -= 1;
  }
	else if(input.left) 
  {
    if(!lastInput.right)
    {
      x -= 1; 
      clearLastInput();
      lastInput.left = true;
    }
    else if(lastInput.right) x += 1;
  }
	else if(input.right) 
  {
    if(!lastInput.left)
    {
      x += 1;      
      clearLastInput();
      lastInput.right = true;
    }
    else if(lastInput.left) x -= 1;
  }


  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  // TODO: Determine if the snake has eaten an apple
  // TODO: Determine if the snake has eaten its tail
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

  // TODO: Draw the game objects into the backBuffer
  backCtx.fillStyle = "red";
  backCtx.fillRect(x, y, 5, 5);

}

/* Launch the game */
window.requestAnimationFrame(loop);

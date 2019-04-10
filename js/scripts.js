// Start it up
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
// Overarching Image Load
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";

//Variables
var gap = 75;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;
// Here we initiate our audio files.
var fly = new Audio();
var scor = new Audio();

fly.src = "img/fly.mp3";
scor.src = "img/score.mp3";
// On Key down
document.addEventListener("keydown", moveUp);
// Now we want to use this function to alter the height of our bird on press.
function moveUp(){
  bY -= 25;
  fly.play();
}

// Lets declare the pipe coordinates and give it an empty array.
var pipe = [];

pipe[0] = {
  x : cvs.width,
  y : 0
};
// Overarching draw
function draw() {
  //Here we will draw out the background.
  ctx.drawImage(bg,0,0);
  // Here we want to use a for loop to draw all the pipes.
  for (var i = 0; i < pipe.length; i++){
    constant = pipeNorth.height+gap
    //Here we will draw the pipeNorth.
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    // Here we will draw the pipeNorth.
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);
    // This allows us to move the pipe to the left.
    pipe[i].x--;
    //Here we will be adding new pipes to the array so more pop up as we go along.
    if(pipe[i].x == 125){
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random()*pipeNorth.height)- pipeNorth.height
      });
    }
    // We will be detecting if there is a collision here.  This collision detection is running various scenarios in which you could impact the pipe.  This also checks to see if your bird impacts the floor.
    if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
      location.reload(); // This will reload the page on fail.
    }
    // This will increase the score as we pass the pipes.
    if(pipe[i].x == 5){
      score++;
      scor.play();
    }
  }
  // Here we will draw the ground.
  ctx.drawImage(fg,0,cvs.height - fg.height);
  // Here we will draw the bird.
  ctx.drawImage(bird,bX,bY);
  // This will change the bird height based on the "gravity".
  bY += gravity;
  // Here we want to draw the score based on the pipes that you pass.
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText('Score :'+score,10,cvs.height-20);
  // This requests the function over and over.
  requestAnimationFrame(draw);
}

draw();

# FlappyBird

#### This project will allow the user to play a FlappyBird clone, 4/14/19


#### By _**Brendan Hellar**_

## Description


#### This game is an attempt to recreate the phone game FlappyBird using the skills learned during a Javascript course.  While not perfect it will container the mechnics required in the original game.

###### This portion will initiate the canvas and allow us to draw on the canvas.  This will also tie image properties to their designated variables and give them an image source.
```
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

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
```
###### This will give us some variable constants in order to set the pace of the game and gravity mechanics.  This also introduces Audio elements and ties them to their variables.
```
var gap = 75;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

var fly = new Audio();
var scor = new Audio();

fly.src = "img/fly.mp3";
scor.src = "img/score.mp3";
```
###### This adds the event listener and allows it to activate on key down.  When this happens the birds Y axis will alter as if it is flying.
```
document.addEventListener("keydown", moveUp);

function moveUp(){
  bY -= 25;
  fly.play();
}
```
###### Sets an empty array for the pipes we are introducing to the game.
```
var pipe = [];

pipe[0] = {
  x : cvs.width,
  y : 0
};
```
###### This is the start of our main function of draw.  This will constantly draw new pipes at random heights but still allow for the bird to always have enough room to move through.
```
function draw() {
  ctx.drawImage(bg,0,0);
  for (var i = 0; i < pipe.length; i++){
    constant = pipeNorth.height+gap
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);
    pipe[i].x--;
 ```
 ######  This generates new pipes as the player progresses.
 ```
    if(pipe[i].x == 125){
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random()*pipeNorth.height)- pipeNorth.height
      });
    }
###### This is our collision mechanic and allows us to detect if the bird hits a pipe.
```
    if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
      location.reload(); // This will reload the page on fail.
    }
```
###### This will be where the score is registered when the pipe is passed and where the bird height is registered.
 ```
    if(pipe[i].x == 5){
      score++;
      scor.play();
    }
  }
  ctx.drawImage(fg,0,cvs.height - fg.height);
  ctx.drawImage(bird,bX,bY);
  bY += gravity;
 ```
###### This allows for the score to get drawn at the designated spot when a pipe is passed. This also constantly calls the Draw function.
```
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText('Score :'+score,10,cvs.height-20);
  requestAnimationFrame(draw);
}

draw();
```
=======

## Setup/Installation Requirements

-   Please clone from the Github repo https://bwhellar.github.io/FlappyBird/
-   The game should start as soon as it loads up.

This app requires the internet as it uses HTMl and CSS and Javascript.

## Known Bugs

No known bugs

## Support and contact details

If you have any issues please contact Brendan Hellar at bwhellar@gmail.com

## Technologies Used

HTML and CSS and Javascript

### License

MIT

Copyright (c) 2019 **Brendan Hellar**

var bg,bgImg;
var player, shooterImg, shooter_shooting,bullet, bimg;
var zombie,zimg, zg, bug;
var score=0;
var bullets=70;
var gamestate="fight";
var rimg,restart;
var lose,win,shoot;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg");
zimg=loadImage("assets/zombie.png");
bimg=loadImage("assets/bullet.png");

rimg=loadImage("assets/rbg.png");
win=loadSound("assets/win.mp3");
lose=loadSound("assets/lose.mp3");
shoot=loadSound("assets/explosion.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zg=new Group();
bug=new Group();



}

function draw() {
  background(0); 


if(gamestate==="fight"){




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
    createbullet()
 
  shoot.play();
}
else if(keyWentUp("space")){ 
  player.addImage(shooterImg) 
}

if(zg.isTouching(bug)){
for(var i=0;i<zg.length;i++){

  if(zg[i].isTouching(bug)){
zg[i].destroy();
bug.destroyEach();
score+=1;
  }
}
}

if(bullets===0){
  gamestate="bullet"
  lose.play();
  }
  if(zg.isTouching(player)){
gamestate="lost";

  }
  
  if(score===60){
    gamestate="won";

    win.play();
  }
createzombie()
}
drawSprites();

textSize(24);
fill("white");
text("score:"+score,displayWidth-200,displayHeight/6-50);

if(gamestate==="lost"){
  textSize(100);
  fill("red");
  text("Game Over",400,400);
  zg.destroyEach();
  player.destroy();


}

else if(gamestate==="won"){
  textSize(150);
  fill("yellow");
  text("You Won",400,400);
  zg.destroyEach();
  player.destroy();


}


else if(gamestate==="bullet"){
  textSize(100);
  fill("red");
  text("You ran out of bullets",400,400);
  zg.destroyEach();
  player.destroy();
bug.destroyEach();

}

}


function createzombie(){
if(frameCount%20===0){
  zombie=createSprite(displayWidth+50,random(displayHeight/4,displayHeight-300),40,70);
  zombie.addImage(zimg);
  zombie.scale=0.2;
  zombie.velocityX=-10;
zg.add(zombie);
}

}

function createbullet(){

  
    bullet=createSprite(displayWidth/5,200,50,100);
    bullet.y=player.y-25;
    bullet.addImage(bimg);
    bullet.scale=0.03;
    bullet.velocityX=10;
  bug.add(bullet);
  bullets=bullets-1;
  


}

function reset(){
  
}


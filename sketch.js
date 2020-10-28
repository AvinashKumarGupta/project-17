//giving var to object
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,monkeyImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;
var gameOverImage

function preload(){
   //adding image , animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  gameOverImage = loadImage("game over.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(400,400) 
// creating objects in the game  
  monkey = createSprite(80,315,20,20)  
monkey.addAnimation("moving",monkey_running);  
monkey.scale = 0.1
  
ground = createSprite(400,350,900,10)  
ground.velocityX = -4  
ground.x = ground.width/2
console.log(ground.x)  
//create Obstacle and food Groups
  FoodGroup = new Group();
 obstacleGroup = new Group();
 score = 0; 
}


function draw() {
background("skyBlue")    
 
 food();
 obstacle();  
// game state = play  
  if (gameState === PLAY) {
  stroke("white")
  textSize(20)
  fill("white")
  text("Score: "+ score, 250,50);  
  
   stroke("white")
  textSize(20)
  fill("white")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survival Time: "+ score, 100,50);  
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }  
 //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;  
 
  }
 monkey.velocityY = monkey.velocityY + 0.8 
  if(FoodGroup.isTouching(monkey)){
  score = score+1
   FoodGroup.setLifetimeEach(0); 
  }
 if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
}
  // game state = end

  if (gameState === END) {
    obstacleGroup.destroyEach(0);
    FoodGroup.destroyEach(0);
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
       ground.velocityX = 0;
      monkey.velocityY = 0  
       FoodGroup.velocityX = 0;
      obstacleGroup.velocityX = 0;
     FoodGroup.velocityY = 0;
      obstacleGroup.velocityY = 0;
  
  }

 monkey.collide(ground) 
 drawSprites();  
}
// new function to food the game
function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
  
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
// new function to obstacle the game
function obstacle() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,120,40,10);
    obstacle.y = Math.round(random(300,330));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
  
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}


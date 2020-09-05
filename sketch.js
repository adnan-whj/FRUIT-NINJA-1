         // FRUIT NINJA!! \\

//CREATING VARIABLES
var PLAY=1;
var END=0;
var gameState=1;
var r;
var fruitGroup,enemyGroup;
var fruit,fruit10,fruit20,fruit30,fruit40;
var alien1,alien10,alien2,alien20;
var knife,sword;
var score;
var gameover,gameover1;
var gameEndSound;
var knifeCutSound;

function preload(){
  //LOADING IMAGES
  knife=loadImage("sword.png");
  fruit10=loadImage("fruit1.png");
  fruit20=loadImage("fruit2.png");
  fruit30=loadImage("fruit3.png");
  fruit40=loadImage("fruit4.png");
  alien10=loadImage("alien1.png");
  alien20=loadImage("alien2.png");
  gameover1=loadImage("gameover.png");
  gameEndSound=loadSound("gameover.mp3");
  knifeCutSound=loadSound("knifeSwoosh.mp3");
}

function setup(){
  createCanvas(600,400);

  //CREATING SPRITES
  gameover=createSprite(290,200,20,20);
  gameover.scale=2;
  gameover.visible=false;
  gameover.addImage(gameover1);
  
  sword=createSprite(60,200,20,20);
  sword.addImage(knife);
  sword.scale=0.7;
 
  //SCORE
  score=0; 
  
  //CREATING GROUPS
  fruitGroup = createGroup();
  enemyGroup = createGroup();
   
  //SETTING COLLIDER
  sword.setCollider("circle",0,0,40);
  sword.debug=true;
}

function draw(){
background("blue");
  
 console.log("this is ",gameState);
  
  //TEXT
   textSize(20);
   text("Score: "+ score, 500-15,50);
   textSize(30);
   text("FRUIT NINJA",200,50);
  
 //GAMESTATE= PLAY   
 
  if (gameState===PLAY){
    
      fruits();
      enemies();
    
    sword.x=mouseX;
    sword.y=mouseY;

 if(fruitGroup.isTouching(sword)){
  knifeCutSound.play();
   fruitGroup.destroyEach();
   score=score+2;
    }
  
 if(sword.isTouching(enemyGroup)){
   gameState=END;
    gameEndSound.play();
   }
    
 }
  
  //GAMESTATE = END
  
if (gameState===END){
   gameover.visible=true;
   score=0;
  
   fruitGroup.destroyEach();
   enemyGroup.destroyEach();
    
}

 drawSprites();
}

// FUNCTIONS to create fruits and aliens

function fruits(){
 
   if(World.frameCount%80===0){
     
    var fruit =createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
     
    if(r==1){
      fruit.addImage(fruit10);
      fruit.x=400;
        fruit.velocityX=-(10+score/4);
    }else if(r==2){
     fruit.addImage(fruit20);
     fruit.x=0;
     fruit.velocityX=(8+score/4);
      
    }else if(r==3){
     fruit.addImage(fruit30);
     fruit.x=0;
     fruit.velocityX=(10+score/4);
      
    }else if(r==4){
     fruit.addImage(fruit40);
     fruit.x=400;
     fruit.velocityX=-(10+score/4);
    }
  
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
  
}


function enemies(){
  
    if (frameCount % 80 === 0) {
    alien1 = createSprite(600,400,40,10);
    alien1.y= Math.round(random(20,400));
    alien1.addImage(alien10);
    alien1.scale = 1.3;
    alien1.velocityX = -(10+score/10);
    alien1.lifetime=200;
    enemyGroup.add(alien1);
    alien1.x=0;
    alien1.velocityX=(12+score/10);
    }
  
   if (frameCount % 80 === 0) {
    alien2 = createSprite(1000,400,40,10);
    alien2.y= Math.round(random(20,400));
    alien2.addImage(alien20);
    alien2.scale = 1.3;
    alien2.velocityX = -(12+score/10);
    alien2.lifetime=200;
    enemyGroup.add(alien2);
    }
  
}
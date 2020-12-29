var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, sword_1, fruit, fruit_1, fruit_2, fruit_3, fruit_4, monster, monster_1, gameOver, gameOver_1;
 var score = 0;
var knifeSwoosh_S, gameover_S;

function preload() {
  sword_1 = loadImage("sword.png");
  monster_1 = loadImage("alien1.png", "alien2.png");
  fruit_1 = loadImage("fruit1.png");
  fruit_2 = loadImage("fruit2.png");
  fruit_3 = loadImage("fruit3.png");
  fruit_4 = loadImage("fruit4.png");
  gameOver_1 = loadImage("gameover.png");
  
  //uploading sounds
  knifeSwoosh_S = loadSound("knifeSwooshSound.mp3");
  gameover_S = loadSound("gameover.mp3");

}

function setup() {
  createCanvas(600, 600);

  //creating the sword
  sword = createSprite(200, 200, 20, 20);
  sword.addAnimation("sword", sword_1)
  sword.scale = 0.7;

  //create Fruit and Enemy Groups
  FruitGroup = new Group();
  EnemyGroup = new Group();
  
  //To create GameOver 
  gameOver=createSprite(300,300,10,10);
  gameOver.addImage(gameOver_1);
  gameOver.scale=1;
  
}

function draw() {
  background("lightblue")
  
  
  sword.setCollider("circle",0,0,50);
  //sword.debug = true;
  
   if(gameState===PLAY){
     
     //Call fruits and Enemy function fruits(); 
     Enemy(); 
     Fruit();
     
     // Move sword with mouse
     sword.y=World.mouseY; 
     sword.x=World.mouseX; 
    
     gameOver.visible=false;
     
     // Increase score if sword touching fruit 
     if(FruitGroup.isTouching(sword)){ 
       
       FruitGroup.destroyEach(); 
       
       knifeSwoosh_S.play();
       score=score+1;
       
     }
     
     else { 
       // Go to end state if sword touching enemy 
       if(sword.isTouching(EnemyGroup)){
         gameState=END; 
         
         gameover_S.play();
         
         
         FruitGroup.destroyEach(); 
         EnemyGroup.destroyEach();
         
         FruitGroup.setVelocityXEach(0);
         EnemyGroup.setVelocityXEach(0); 
         
         // Change the animation of sword to gameover and reset its position
         sword.addImage("gameOver",gameOver_1 );
         sword.x=290; 
         sword.y=220; 
         
         gameOver.visible=true;
       } 
     } 
   } 
  drawSprites(); 
   
  //Display score text
     text("Score : "+ score,500,30);


}


function Enemy() {
  //creating function for the monster
  if (frameCount % 200 === 0) {
    monster = createSprite(200, 300, 20, 20);
    monster.addAnimation("monster", monster_1);
    monster.y = Math.round(random(100,300));
     fruit.velocityX = -(8+(score/10));
    monster.velocityX = -8;
    monster.lifetime = 50;

    EnemyGroup.add(monster);
  }
}
  function Fruit() {
    if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
      fruit.scale=0.2;
      
      position = Math.round(random(1,2));
      
      if(position===1){
         fruit.x = 400;
         fruit.velocityX = -(7+(score/4));
         }
      
      else
        {
          
          if(position===2){
            fruit.x = 0;
            
            //Increase the velocity of the fruit after 4 or 10 (score)
            
            fruit.velocityX = (7+(score/4));
          }
        }
      
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit_1);
    } else if (r == 2) {
      fruit.addImage(fruit_2);
    } else if (r == 3) {
      fruit.addImage(fruit_3);
    } else {
      fruit.addImage(fruit_4);
    }
    
    fruit.y=Math.round(random(50,340));
  
      
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    FruitGroup.add(fruit);
  }
  
}
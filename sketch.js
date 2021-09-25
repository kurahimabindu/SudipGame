var gameState="serve"
var obstaclesGroup,obstacles2Group
var score=0 , highScore = 0


function preload(){
  bgImg=loadImage("bg.png")
  groundImg=loadImage("Grass.png")
  birdImg=loadImage("bird.png")
  DownPipeImg=loadImage("DownPipe.png")
  upPipeImg=loadImage("upPipe.png")

}
function setup(){
  createCanvas(600,700)
  bg=createSprite(300,350)
  bg.addImage(bgImg)
  bg.scale=1.4

  ground=createSprite(300,640)
  ground.addImage(groundImg)
  ground.scale=1.4

  bird=createSprite(100,320)
  bird.addImage(birdImg)
  bird.scale=0.15
  bird.debug=false

  obstaclesGroup=new Group()
  obstacles2Group=new Group()
}
function draw(){
  background("grey")

    
  
  if(gameState==="play"){
    
    ground.velocityX=3
    if(ground.x>600 ){
      ground.x=300
    }
    if (keyDown(UP_ARROW)){
      bird.velocityY=-5
    }
    bird.velocityY=bird.velocityY+0.8
    obstacles();


    if(bird.isTouching(obstaclesGroup)||bird.isTouching(obstacles2Group)|| bird.y>700){
      gameState="end"

    }
    score = score + Math.round((frameRate()/61))
    if(highScore<score){
      highScore = score
    }
   console.log(frameRate())

  }
  
  if(keyDown("space")){
    gameState="play"

  }

  if(gameState==="end"){
    obstaclesGroup.setVelocityXEach(0)
    obstacles2Group.setVelocityXEach(0)
    ground.velocityX=0
    bird.velocityY=10
    //bird.destroy()
    

    
    
  }

     
  drawSprites();
  if(gameState==="end"){
    fill("black")
    textSize(18)
    text("Score : "+score,300,320)
    text("High Score : "+highScore,300,330)
    fill("red")
    text("Press R to restart the game",280,350)

    
  }

  if(gameState==="play"){
    fill("black")
    textSize(18)
    text("Score : "+score,10,20)
    fill("red")
    text("High Score : "+highScore,10,35)
  }

  if(gameState==="serve"){
    drawSprites()
    textSize(24);
    fill("black")
    text("Press Space to start the game",150,360)
    textSize(20);
    fill("black")
    text("Use Up and Down arrow keys to move the bird",95,400)
    //createBird()
    bird.x=100
    bird.y=320
 
    
   
  }
  if(keyDown("R")){
    gameState="serve"
    score=0
    obstaclesGroup.destroyEach()
    obstacles2Group.destroyEach()
  }
 
}
function obstacles(){
  

  if (frameCount%50===0){
  var y=Math.round(random(30,70))
  var obstacles=createSprite(600,y)
  obstacles.addImage(DownPipeImg)
  obstacles.velocityX=-6
  obstaclesGroup.add(obstacles)
  var y2=Math.round(random(670,640))
  obstacles2=createSprite(600,y2)
  obstacles2.addImage(upPipeImg)
  obstacles2.velocityX=-6
  obstacles.debug=false
  obstacles2.debug=false
  obstacles.setCollider("rectangle",0,0,120,obstacles.height)
  obstacles2.setCollider("rectangle",0,0,120,obstacles.height)
  obstacles2Group.add(obstacles2)

  }
 

}


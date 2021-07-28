var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var grass, grassImg;
var fedTime, lastFed, feed, addFood, foodObj;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  grassImg = loadImage("grass.jpg")

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  foodObj = new Food();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  dog=createSprite(250,350,10,10);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(600,30);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,30);
  addFood.mousePressed(addFoods);

  for (var i = 5; i < 500; i=i+10) 
  {
  grass = createSprite(i, 5, 3, 3);
  grass.addImage(grassImg);
  grass.scale = 0.1;
  }
 for (var i = 5; i < 500; i=i+10)
 {
 grass= createSprite(i, 485, 3, 3);
 grass.addImage(grassImg);
 grass.scale = 0.1;
 }

 }

function draw() {
  background("cyan");
  foodObj.display();

  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill("black");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed % 12 + " PM", 350,50);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,50);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,50);
   }
 
  drawSprites();
  textSize(17);
  fill("black");
  text("I am Shiro..🐶 I am Hungry..😢😋",100,100);
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(dogHappyImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS 
  })
}
  /*dog = createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(700, 30);
  addFood.mousePressed(addfoods);

  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  

  
}


function draw() {  
  background("cyan")
  foodObj.display();

  /*if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 20;

}*/


/*fedTime = database.ref('fedTime');
fedTime.on('value', function(data){
  lastFed = data.val();
})
if(lastFed >=12){
  text("LAST FEED :" + lastFed % 12 + 'pm', 350, 50);
} else if(lastFed === 0){
  text("LAST FEED : 12 am", 350, 50);
}else {
  text("LAST FEED :"+ lastFed+'am', 350, 50);
}


  drawSprites();
  
function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(dogHappyImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}
function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}*/



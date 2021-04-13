var dog,sadDog,happyDog;
var addFood, feedDog;
var foodS;
var foodObject;

var database;
var stock = 0;
var lastFed

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObject = new Food();


  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  

  feedDog = createButton("Feed the dog");
  feedDog.position(650, 95);
  feedDog.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(750, 95);
  addFood.mousePressed(addFood);

}

function draw() {
  background(46,139,87);
  drawSprites();

  foodObject.display();

  var fedtime = database.ref('LastFed')
  fedtime.on("value", (data)=>{
    lastFed = data.val();
  })
}

//function to read food Stock
function readStock(){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);

}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val = foodObject.getFoodStock();
  if(food_stock_val <=0 ){
    foodObject.updateFoodStock(food_stock_val*0);

  }else{
    foodObject.deuctFood(food_stock_val - 1)
  }
   
}

//function to add food in stock
/*database.ref('Food').update({
  Food : foodObject.getFoodStock(),
  feedTime: hour ()
})*/

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

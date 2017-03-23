var foods;

function setFoods() {
  $.get("https://quantify-yourself.herokuapp.com/api/foods", function(data){
  }).done( function(data){ 
    foods = data;
    addFoodOrWarning();
    filterRows();
    deleteFood();
    displayFoods();
    caloriesSort();
    changeFood();
    blurOnEnter()
    
  })
}

function setIndexFoods() {
  $.get("https://quantify-yourself.herokuapp.com/api/foods", function(data){
  }).done( function(data){ 
    foods = data;
    displayDiaryFoods();
    dayButtons();
    displayForNewDay();
    enableMealButtons();
    enableAllDiaryDeleteButtons();
    filterDiaryRows();
  })
}

function displayForNewDay() {
  displayDay();
  setDiaryDay();
  populateMeals();
  updateTotals();
}

function storeFood(name, calories) {
  newFood = new Food(name, calories)
  $.post("https://quantify-yourself.herokuapp.com/api/foods", newFood, function(data){
  }).done( function(data) {
    addId(data.rows[0].id)
  })
}

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
}

function removeFood(id) {
  $.ajax({
   url: "https://quantify-yourself.herokuapp.com/api/foods/"+ id,
   type: 'DELETE'
  })
}

function updateCalories(id, newValue) {
  var data = { calories: newValue}
  $.ajax({
    url: "https://quantify-yourself.herokuapp.com/api/foods/"+ id,
    type: 'PUT',
    data: data
    })
}

function updateName(id, newValue) {
  var data = { name: newValue}
  $.ajax({
    url: "https://quantify-yourself.herokuapp.com/api/foods/"+ id,
    type: 'PUT',
    data: data
    })
}

function sortFoods() {
  if (sortIndex % 3 === 0) { sortFoodsDescending(); }
  else if (sortIndex % 3 === 1) { sortFoodsAscending(); }
  else { setFoods(); }
  sortIndex++;
}

function sortFoodsDescending() {
  foods.sort(function(foodOne, foodTwo){
    return foodTwo.calories - foodOne.calories
  });
}

function sortFoodsAscending() {
  foods.sort(function(foodOne, foodTwo){
    return foodOne.calories - foodTwo.calories
  });
}

function deleteFood() {
  $('table#food-list').on('click', '.food-delete', function() {
    var id = $(this).parents('tr').attr('id');
    $(this).parents('tr').remove();
    removeFood(id);
  })
}

function filterRows() {
  $('#food-filter input').keyup(function() {
    var rows = $('tr.food-row');
    var filter = $('#food-filter input').val().toLowerCase();
    rows.hide();
    showRows(filter, rows);
  })
}

function showRows(filter, rows) {
  rows.each(function() {
    var name = $(this).children('.food-name').text().toLowerCase();
    if (name.indexOf(filter) >= 0) {
      $(this).show();
    }
  });
}

function prependRow(name, calories, id) {
  var row = "<tr class='food-row' id=" + id + ">" +
            "<td class='food-name'><span contenteditable='true'>" + 
            name + 
            "</span></td> <td class='food-calories'><span contenteditable='true'>" + 
            calories + 
            "</span></td> <td class='food-delete'><button>-</button></td>";
  $('#food-list').prepend(row);
  $('#name-field input, #calories-field input').val('');
}

function displayFoods() {
  foods.forEach(function(foodItem) {
    prependRow(foodItem.name, foodItem.calories, foodItem.id);
    return true;
  })
}

function addId(id) {
  $('tr.food-row#undefined').removeAttr('id').attr('id', id)
}

function caloriesSort() {
  $('#sort-calories').on('click', function() {
    $('tr.food-row').hide();
    sortFoods();
    displayFoods();
  })
}

function changeFood() {
  var id;
  $('table#food-list').on('focus','span', function(event){
    id = $(this).parents('tr.food-row').attr('id');
  });
  $('table#food-list').on('blur','span', function(event){
    var newValue = event.target.innerText;
    updateFood(id, newValue, event);
  });
}

function blurOnEnter(){
  $('table#food-list').keydown('span', function(event){
    if (event.keyCode == 13) {
      $(event.target).blur();
      return false;
    }
  });
}

function updateFood(id, newValue, event){
  if ($(event.target).parents('td.food-calories').text()) {
    updateCalories(id, newValue);
  } else {
    updateName(id, newValue);
  }
}

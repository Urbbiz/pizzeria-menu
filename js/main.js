/***************
EXECUTION
****************/

const menu = new Menu();
menu.loadPizzas();
showPizzas();

document.getElementById("add-new-pizza").addEventListener("click", addPizza);
document.getElementById("sort-by-name").addEventListener("click", function() { sortPizzas(""); });
document.getElementById("sort-by-price").addEventListener("click", function() { sortPizzas("price"); });
document.getElementById("sort-by-heat").addEventListener("click", function() { sortPizzas("heat"); });
let sortType = "";

function showPizzas() {

    let html = "";
    const pizzas = menu.sortPizzas(sortType);
    if (pizzas.length) {
        pizzas.forEach(function(pizza) {
            let heatHtml = "";
            if (pizza.heat) {
                for (let i = 0; i < pizza.heat; i++) {
                    heatHtml += "<img src='img/chili/chili.png' />"
                }
            }

            let photoHtml = pizza.photo && `<img src='img/pizza/${pizza.photo}' />`;

            html += `
            <div class="col-4 col-sm-6 col-xs-12">
                <div class="block">
                    <img>${photoHtml}</img>
                     <h3>${pizza.name} </h3>
                    <p> ${pizza.price}Eur </p>
                    <div>${heatHtml}</div>
                    <p>Toppings: ${pizza.toppings.join(", ")} </p>
                   
                <button class="btn-red" type="button" onclick="deletePizza('${pizza.insertDate}')">Delete</button>
                </div>
            </div>`;
        });
    } else {
        html = '<div class="col-12">No pizzas</div>';
    }

    document.getElementById("pizza-menu").innerHTML = html;
}

function clearValidations() {
    const validationElements = document.querySelectorAll("[id$=validation]");
    validationElements.forEach(element => element.innerHTML = "");
}

function clearAddForm() {
    document.getElementById("new-name").value = "";
    document.getElementById("new-price").value = "";
    document.getElementById("new-heat").value = "";
    document.getElementById("new-toppings").value = "";
    document.getElementById("new-photo").value = "";
}

function addPizza() {
    const params = {
        name: document.getElementById("new-name").value,
        price: document.getElementById("new-price").value,
        heat: document.getElementById("new-heat").value,
        toppings: document.getElementById("new-toppings").value,
        photo: document.getElementById("new-photo").value
    };

    clearValidations();
    const errors = menu.validatePizza(params);

    if (errors.length) {
        errors.forEach(function(error) {
            const key = error.key;
            const validationElement = document.getElementById("new-" + key + "-validation");
            validationElement.innerText = error.message;
        });
    } else {
        menu.addPizza({
            name: params.name,
            price: parseFloat(params.price),
            heat: params.heat && parseInt(params.heat),
            toppings: params.toppings.split(","),
            photo: params.photo
        });

        clearAddForm();
        showPizzas();
    }
}

function deletePizza(insertDate) {
    if (confirm("Are you sure?")) {
        menu.deletePizza(insertDate);
        showPizzas();
    }
}

function sortPizzas(by) {
    sortType = by;
    showPizzas();
}
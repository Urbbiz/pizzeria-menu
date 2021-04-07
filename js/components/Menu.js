class Menu {

    constructor() {
        this.pizzas = [];
        this.sessionStorageKey = 'pizzas';
    }

    loadPizzas() {
        this.pizzas = JSON.parse(sessionStorage.getItem(this.sessionStorageKey)) || [];
    };

    savePizzas() {
        sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.pizzas));
    };

    addPizza(params) {
        const newPizza = new Pizza(params);
        this.pizzas.push(newPizza);
        this.savePizzas();
    };

    deletePizza(insertDate) {
        //const pizzaIndex = this.pizzas.findIndex(function(pizza) { return pizza.insertDate === insertDate; });
        const pizzaIndex = this.pizzas.findIndex(pizza => pizza.insertDate === insertDate);
        this.pizzas.splice(pizzaIndex, 1); //trina pizza is arejaus.
        this.savePizzas();
    };

    validatePizza(params) {
        const errors = [];
        params = params || {};

        //  Name
        if (!params.name) {
            errors.push({ key: "name", message: "Please provide name" });
        } else if (this.pizzas.find(pizza => pizza.name === params.name)) {
            errors.push({ key: "name", message: "Please provide unique name" });
        } else if (params.name.length > 30) {
            errors.push({ key: "name", message: "Max length 30 chars" });
        }

        //  Price
        if (!params.price) {
            errors.push({ key: "price", message: "Please provide price" });
        } else if (isNaN(params.price)) {
            errors.push({ key: "price", message: "Please provide number" });
        } else if (params.price < 0) {
            errors.push({ key: "price", message: "Please provide positive number" });
        } else if (parseFloat(parseFloat(params.price).toFixed(2)) != params.price) {
            errors.push({ key: "price", message: "Please provide max 2 decimal points" });
        }

        // Heat 

        if (params.heat) {
            if (isNaN(params.heat)) {
                errors.push({ key: "heat", message: "Please provide number" });
            } else if (Math.floor(params.heat) != params.heat) {
                errors.push({ key: "heat", message: "Please provide integer" });
            } else if (params.heat < 1 || params.heat > 3) {
                errors.push({ key: "heat", message: "Please provide in range 1-3" });
            }
        }

        // Toppings

        if (!params.toppings || params.toppings.split(',').length < 2) {
            errors.push({ key: "toppings", message: "Please provide at least 2 toppings" });
        }


        return errors;
    }

    sortPizzas(by) {
        if (by === "price") {
            return [...this.pizzas].sort((a, b) => a.price - b.price);
        } else if (by === "heat") {
            return [...this.pizzas].sort((a, b) => (b.heat || 0) - (a.heat || 0));
        } else {
            return [...this.pizzas].sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }
    }
};
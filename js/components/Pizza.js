class Pizza {
    constructor(params) {
        this.name = params.name || '';
        this.price = params.price || 0.00;
        this.heat = params.heat;
        this.toppings = params.toppings || [];
        this.photo = params.photo;
        this.insertDate = new Date().toISOString(); // identifikatorius pagal data.
    }
};
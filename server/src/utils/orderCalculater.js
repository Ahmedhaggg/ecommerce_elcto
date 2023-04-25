let TAX_PERCENTAGE = 0.15; 

let calculateOrderTax  = (products) =>  products
    .reduce((totalTax, product) => (product.price * product.quantity * TAX_PERCENTAGE ) + totalTax, 0)

let calculateOrderProductsPrice  = (products) => products
    .reduce((totalPrice, product) => (product.price * product.quantity) + totalPrice, 0);

exports.calculateOrderAmount = (products) => {
    let totalProductsPrice =  calculateOrderProductsPrice(products);
    
    let tax = calculateOrderTax(products);

    return totalProductsPrice + tax;
}

exports.amountWithCents = amount => amount * 100;
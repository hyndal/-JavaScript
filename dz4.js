//1.
let mathObj = {};
let x = Number(prompt("Введите число от 0 до 999"));
if (0 <= x && x <= 999) {
    mathObj.сотни = Math.trunc(x / 100);
    mathObj.десятки = Math.trunc((x % 100) / 10);
    mathObj.единицы = Math.trunc((x % 100) % 10);
    console.log(mathObj);
} else {
    console.log('Введено неверное число - ', mathObj);
}

//2.
let basket = {
    sumBasket: 0,
    //функция добавления товара в корзину
    addProduct: function (newProduct) {
        if (this[newProduct.id] != undefined) {
            this[newProduct.id].count++;
            this[newProduct.id].sum += newProduct.price
        } else {
            this[newProduct.id] = { product: newProduct, count: 1, sum: newProduct.price }
        }
        this.sumBasket += newProduct.price
    }
}
//для единой структуры продуктов и наследования создал класс
class Product {
    constructor(id, name, price) {
        this.id = id;//идентификатор карточки продукта
        this.name = name;//название продукта
        this.price = price//цена продукта
    }
}
//для примера созданы две новые карточки продуктов
let product1 = new Product('product1', 'Товар 1', 100)
let product2 = new Product('product2', 'Товар 2', 200)

basket.addProduct(product1)
basket.addProduct(product1)
basket.addProduct(product2)
console.log(basket)
console.log('Сумма корзины-', basket.sumBasket)
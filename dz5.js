let products = [];
class Product {
    constructor(id, name, price) {
        this.id = id;//идентификатор карточки продукта
        this.name = name;//название продукта
        this.price = price//цена продукта
    }
}
let basket = {
    sumBasket: 0,//чтобы не пересчитывать каждый раз при выводе сумму считаю ее сразу при изменении корзины
    //вместо массива сделал объект, чтобы к товару внутри корзины обращаться по id, не искать его в массиве
    bascketList: {},
    //функция добавления товара в корзину
    addProduct: function (newProduct) {
        if (this.bascketList[newProduct.id] != undefined) {
            this.bascketList[newProduct.id].count++;
            this.bascketList[newProduct.id].sum += newProduct.price
        } else {
            this.bascketList[newProduct.id] = { product: newProduct, count: 1, sum: newProduct.price }
        }
        this.sumBasket += newProduct.price
    }
}

function init() {

    //1.
    let cell = document.getElementById("cell");
    let isBlack = false;
    for (let y = 9; y > 0; y--) {
        for (let x = 0; x < 9; x++) {

            let checkerboard = document.createElement("div");

            params = getCellParam(x, y, isBlack);
            checkerboard.classList.add('checkerboardCage')
            checkerboard.innerHTML = params.pText;
            checkerboard.style.backgroundColor = params.pColorBckg;
            checkerboard.style.color = params.pColor;
            checkerboard.style.textShadow = params.sColor;
            if (x > 0) {
                isBlack = !isBlack;
            }

            cell.append(checkerboard);

        }
        if (y < 9) { isBlack = !isBlack; }
    }

    //2.
    let product1 = new Product('product1', 'Товар 1', 100)
    let product2 = new Product('product2', 'Товар 2', 200)
    products.push(product1, product2)

    let productsDiv = document.getElementById("products");
    let checkerboard = document.createElement("ol");
    if (products.length > 0) {
        let productsHead = document.createElement("h1");
        productsHead.textContent = 'Список товаров';
        productsDiv.append(productsHead)
    }
    productsDiv.append(checkerboard);
    products.forEach(element => {
        let cardProduct = document.createElement("li");
        cardProduct.textContent = element.name + ' - ' + element.price + 'rub.';
        checkerboard.append(cardProduct);
    });

    basket.addProduct(product1)
    basket.addProduct(product1)
    basket.addProduct(product2)
    let basketDiv = document.getElementById("basket");
    let basketsHead = document.createElement("h1");
    basketsHead.textContent = 'Корзина товаров';
    basketDiv.append(basketsHead)
    //для корзины товаров сделал вывод этой корзины в список, в задании было указано общую информацию вывести...это ошибка?
    if (Object.keys(basket.bascketList).length > 0) {
        let basketList = document.createElement("ol");
        basketDiv.append(basketList);
        for (const key in basket.bascketList) {
            console.log(basket.bascketList[key])
            let basketProduct = document.createElement("li");
            basketProduct.textContent = basket.bascketList[key].product.name + ' - ' + basket.bascketList[key].count + 'шт. ' + ' - ' + basket.bascketList[key].sum + 'руб.';
            basketList.append(basketProduct);
        }
        let basketsSum = document.createElement("h3");
        basketsSum.textContent = 'Итог - ' + basket.sumBasket + 'руб.';
        basketDiv.append(basketsSum)
    }
    else {
        let t = document.createTextNode('Корзина пустая');
        basketDiv.append(t);
    }
}

function getCellParam(x, y, isBlack) {

    let params = { pText: '', pColorBckg: '', pColor: '', sColor: '' };
    if (x === 0 && y < 9) {
        params.pText = y;
        params.pColorBckg = 'white';
        params.pColor = 'black';
        params.sColor = 'black';

        return params;
    } else if (x > 0 && y === 9) {
        params.pText = String.fromCharCode(96 + x);
        params.pColorBckg = 'white';
        params.pColor = 'black';
        params.sColor = 'black';

        return params;
    }
    if (isBlack) {
        params.pColorBckg = 'black';
    } else {
        params.pColorBckg = 'white';
    }
    if (y === 1 || y === 2) {
        params.pColor = 'white';
        params.sColor = '1px 1px 1px black';
    } else if (y === 7 || y === 8) {
        params.pColor = 'black';
        params.sColor = '1px 1px 1px white';
    }
    if (y === 2 || y === 7) {
        params.pText = 'П';
    } else if (y === 1 || y === 8) {
        switch (x) {
            case 1:
            case 8:
                params.pText = 'Л'; //ладья
                break;
            case 2:
            case 7:
                params.pText = 'К'; //конь
                break;
            case 3:
            case 6:
                params.pText = 'С'; //слон
                break;
            case 4:
                params.pText = 'Ф'; //ферзь
                break;
            case 5:
                params.pText = 'Кр'; //король
                break;
        }
    }
    return params
}

window.addEventListener('load', init);
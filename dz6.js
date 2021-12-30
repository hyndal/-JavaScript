let products = {};
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
    let product1 = new Product('product1', 'Товар 1', 100)
    let product2 = new Product('product2', 'Товар 2', 200)
    let product3 = new Product('product3', 'Товар 3', 300)
    products[product1.id] = product1
    products[product2.id] = product2
    products[product3.id] = product3

    createProducts();
    createBasket();
}
function closeContent() {
    let content = document.getElementById("contentId");
    content.style.display = 'none'
    let contentBody = document.getElementById("contentBody");
    contentBody.innerHTML = ''
}
function modifyBasket(productId) {
    basket.addProduct(products[productId])
    createBasket()
}
function showImage(event) {
    cardId = Number(event.target.dataset.id)
    let contentImg = document.getElementById("contentImg");
    contentImg.src = 'https://picsum.photos/id/' + cardId + '/500';
}
function imageClick(event) {
    cardPhotos = [];
    cardId = Number(event.target.dataset.id)
    let content = document.getElementById("contentId");
    content.style.display = 'block'
    let contentImg = document.getElementById("contentImg");
    contentImg.src = 'https://picsum.photos/id/' + cardId + '/500';
    let contentBody = document.getElementById("contentBody");
    for (let index = 0; index < 5; index++) {
        let newImg = document.createElement("img");
        newImg.src = 'https://picsum.photos/id/' + cardId + '/150?blur';
        newImg.style.cursor = 'pointer';
        newImg.style.borderRadius = '5px';
        newImg.style.transition = '1s';
        newImg.style.padding = '5px';
        newImg.setAttribute('data-id', cardId);
        contentBody.append(newImg)
        newImg.addEventListener('click', showImage)
        cardPhotos.push(cardId++);
    }
    let close = document.getElementById("close");
    close.addEventListener("click", closeContent)
}

function createProducts() {
    let productsDiv = document.getElementById("products");
    if (Object.keys(products).length > 0) {
        let productsHead = document.createElement("h1");
        productsHead.textContent = 'Список товаров';
        productsDiv.append(productsHead)
    }
    let index = 1;
    for (const key in products) {
        index *= 10
        let cardDiv = document.createElement("div");
        cardDiv.classList.add('card')
        cardDiv.style.padding = '10px';
        productsDiv.append(cardDiv);
        let cardImage = document.createElement('img');
        cardImage.src = 'https://picsum.photos/id/' + index + '/200';
        cardImage.style.cursor = 'pointer';
        cardImage.style.borderRadius = '5px';
        cardImage.style.transition = '0.3s';
        cardImage.setAttribute('data-id', index)
        cardDiv.append(cardImage)
        let cardText = document.createElement("p")
        cardText.innerText = products[key].name + ' - ' + products[key].price + 'rub.';
        cardDiv.append(cardText)
        var cardAdd = document.createElement('button')
        cardAdd.innerText = 'Добавить в корзину'
        cardAdd.setAttribute('data-id', products[key].id)
        cardDiv.append(cardAdd)
        cardImage.addEventListener('click', imageClick)
        cardAdd.addEventListener("click", () => { modifyBasket(products[key].id); })
    };
}

function createBasket() {
    let basketDiv = document.getElementById("basket");
    basketDiv.innerHTML = ''
    let basketsHead = document.createElement("h1");
    basketsHead.textContent = 'Корзина товаров';
    basketDiv.append(basketsHead)
    if (Object.keys(basket.bascketList).length > 0) {
        let basketList = document.createElement("ol");
        basketDiv.append(basketList);
        for (const key in basket.bascketList) {
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

window.addEventListener('load', init);
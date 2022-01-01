let productImgNum = 0;
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
    statusBasket: 0,
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
    },
    delProduct: function (newProduct) {
        if (this.bascketList[newProduct.id].count == 1) {
            delete this.bascketList[newProduct.id]
        } else {
            this.bascketList[newProduct.id].count--;
            this.bascketList[newProduct.id].sum -= newProduct.price
        }
        this.sumBasket -= newProduct.price
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
    basketNext()

    let basketButton = document.getElementById("basketButton");
    basketButton.addEventListener('click', () => basketNext(true))
}
function basketNext(nextIndex) {
    if (nextIndex == true) basket.statusBasket++
    let basketList = document.getElementById("hd-1");
    let basketAddr = document.getElementById("hd-2");
    let basketComment = document.getElementById("hd-3");
    let basketButton = document.getElementById("basketButton");
    switch (basket.statusBasket) {
        case 0:
            basketList.checked = false;
            basketAddr.checked = false;
            basketComment.checked = false;
            basketButton.removeAttribute('disabled');
            break
        case 1:
            basketList.checked = true;
            basketAddr.checked = false;
            basketComment.checked = false;
            basketButton.removeAttribute('disabled');
            break
        case 2:
            basketList.checked = false;
            basketAddr.checked = true;
            basketComment.checked = false;
            basketButton.removeAttribute('disabled');
            break
        case 3:
            basketList.checked = false;
            basketAddr.checked = false;
            basketComment.checked = true;
            basketButton.removeAttribute('disabled');
            break
        default:
            basketList.checked = false;
            basketAddr.checked = false;
            basketComment.checked = false;
            basketButton.setAttribute('disabled', true);
            break
    }
}
function closeContent() {
    let content = document.getElementById("contentId");
    content.style.display = 'none'
    let contentBody = document.getElementById("contentBody");
    contentBody.innerHTML = ''
    productImgNum = 0;
}
function modifyBasket(productId, typeOperation) {
    if (typeOperation === 1) {
        basket.addProduct(products[productId])
    } else {
        basket.delProduct(products[productId])
    }
    basket.statusBasket = 1;
    createBasket()
    basketNext()
}
function showNextImage(cardPhotos, keyCode) {
    if (keyCode == 'ArrowRight') {
        productImgNum++;
    } if (keyCode == 'ArrowLeft') {
        productImgNum--;
    }
    if (productImgNum == cardPhotos.length) {
        productImgNum = 0;
    } if (productImgNum < 0) {
        productImgNum = cardPhotos.length - 1;
    }
    let cardId = Number(cardPhotos[productImgNum])
    let contentImg = document.getElementById("contentImg");
    contentImg.src = 'https://picsum.photos/id/' + cardId + '/400';
}
function showImage(cardIdP, index) {
    productImgNum = index;
    let contentImg = document.getElementById("contentImg");
    contentImg.src = 'https://picsum.photos/id/' + cardIdP + '/400';
}
function imageClick(event) {
    productImgNum = 0;
    cardPhotos = [];
    let cardId = Number(event.target.dataset.id)
    let content = document.getElementById("contentId");
    content.style.display = 'block'
    let contentImg = document.getElementById("contentImg");
    contentImg.src = 'https://picsum.photos/id/' + cardId + '/400';
    let contentBody = document.getElementById("contentBody");
    for (let index = 0; index < 5; index++) {
        let newImg = document.createElement("img");
        newImg.src = 'https://picsum.photos/id/' + cardId + '/100';
        newImg.style.cursor = 'pointer';
        newImg.style.borderRadius = '5px';
        newImg.style.transition = '1s';
        newImg.style.margin = '5px';
        newImg.classList.add('blurImg');
        newImg.setAttribute('data-id', cardId);
        contentBody.append(newImg)
        let cardIdP = cardId;
        newImg.addEventListener('click', () => showImage(cardIdP, index))
        cardPhotos.push(cardId++);
    }
    let close = document.getElementById("close");
    close.addEventListener("click", closeContent)
    document.addEventListener('keydown', event => showNextImage(cardPhotos, event.code));
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
        let cardAdd = document.createElement('button')
        cardAdd.innerText = 'Добавить в корзину'
        cardAdd.setAttribute('data-id', products[key].id)
        cardDiv.append(cardAdd)
        cardImage.addEventListener('click', imageClick)
        cardAdd.addEventListener("click", () => modifyBasket(products[key].id, 1))
    };
}
function createBasket() {
    let basketDiv = document.getElementById("basketList");
    let basketBasement = document.getElementById("basketBasement");
    basketDiv.innerHTML = ''
    basketBasement.innerHTML = ''
    if (Object.keys(basket.bascketList).length > 0) {
        let basketList = document.createElement("ol");
        basketDiv.append(basketList);
        for (const key in basket.bascketList) {
            let basketProduct = document.createElement("li");
            basketProduct.textContent = basket.bascketList[key].product.name + ' - ' + basket.bascketList[key].count + 'шт. ' + ' - ' + basket.bascketList[key].sum + 'руб.';
            basketList.append(basketProduct);
            let basketListDel = document.createElement('button')
            basketListDel.innerText = '-'
            basketListDel.classList.add('basketChBt')
            basketListDel.setAttribute('data-id', basket.bascketList[key].product.id)
            let basketListAdd = document.createElement('button')
            basketListAdd.innerText = '+'
            basketListAdd.classList.add('basketChBt')
            basketListAdd.setAttribute('data-id', basket.bascketList[key].product.id)
            basketProduct.append(basketListDel)
            basketProduct.append(basketListAdd)
            basketListDel.addEventListener("click", () => modifyBasket(basket.bascketList[key].product.id, 2))
            basketListAdd.addEventListener("click", () => modifyBasket(basket.bascketList[key].product.id, 1))
        }
        let basketsSum = document.createElement("h3");
        basketsSum.textContent = 'Сумма корзины - ' + basket.sumBasket + 'руб.';
        basketBasement.append(basketsSum)
    }
    else {
        let t = document.createTextNode('Корзина пустая');
        basketBasement.append(t);
    }
}

window.addEventListener('load', init);
//1.
function isPrime(num) {
    let count = 2;
    while (count < num) {
        if (num % count === 0) {
            return false;
        }
        count++;
    }
    return true;
}
let i = 1;
while (i <= 100) {
    if (isPrime(i) === true) {
        console.log(i);
    }
    i++;
}

//2.
function countCartPrice(basket) {
    let bascketSum = 0;
    for (var i = 0; i < basket.length; i++) {
        bascketSum += basket[i];
    }
    return bascketSum;
}
let basket = [];
let command;
while (command != 'end') {
    command = prompt("Введите стоимость товара, либо end для подсчета стоимости корзины: ");
    if (command != 'end') {
        basket.push(Number(command));
    }
}
console.log('Сумма корзины - ' + countCartPrice(basket));

//3.
for (let i = 0; i < 10; console.log(i), i++) { }

//4.
for (let i = 0, x = ''; i < 20; x += 'x', console.log(x), i++) { }
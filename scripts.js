//1.
var a = 1, b = 1, c, d;
c = ++a; alert(c);          // 2, сначала инкремент
d = b++; alert(d);          // 1, инкремент после присваивания
c = (2 + ++a); alert(c);    // 5, сначала инкремент - 2+3
d = (2 + b++); alert(d);    // 4, сначала сложение, потом инкремент - 2+2
alert(a);                   // 3, т.к. было два инкремента
alert(b);                   // 3, т.к. было два инкремента

//2.
var a = 2;
var x = 1 + (a *= 2);
alert(x);                   //работает как x = x * 2

//3.
var a = Number(prompt("Введите число a: "));
var b = Number(prompt("Введите число b: "));
if (a >= 0 && b >= 0) {
    alert(a - b);
} else if (a < 0 && b < 0) {
    alert(a * b);
} else if (a * b < 0) {
    alert(a + b);
}

//4.
var a = Number(prompt("Введите число b в диапазоне 0-15: "));
var result = "Строка вывода - ";
switch (a) {
    case 0: result += "0,"
    case 1: result += "1,"
    case 2: result += "2,"
    case 3: result += "3,"
    case 4: result += "4,"
    case 5: result += "5,"
    case 6: result += "6,"
    case 7: result += "7,"
    case 8: result += "8,"
    case 9: result += "9,"
    case 10: result += "10,"
    case 11: result += "11,"
    case 12: result += "12,"
    case 13: result += "13,"
    case 14: result += "14,"
    case 15: result += "15"
}
alert(result);

//5.
function addition(a, b) {
    return a + b;
}
function subtraction(a, b) {
    return a - b;
}
function multiplication(a, b) {
    return a * b;
}
function division(a, b) {
    return a / b;
}

//6.
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "addition": return addition(arg1, arg2);
        case "subtraction": return subtraction(arg1, arg2);
        case "multiplication": return multiplication(arg1, arg2);
        case "division": return division(arg1, arg2);
    }
}
var a = Number(prompt("Введите число a: "));
var b = Number(prompt("Введите число b: "));
alert("Сложение - " + mathOperation(a, b, "addition"));
alert("Вычитение - " + mathOperation(a, b, "subtraction"));
alert("Умножение - " + mathOperation(a, b, "multiplication"));
alert("Деление - " + mathOperation(a, b, "division"));

//7.
//операции >,<,>=,>= преобразуют null в 0, в отличие от операторов == и ===
alert(null > 0); //false
alert(null == 0); //false
alert(null === 0); //false
alert(null != 0); //true
alert(null >= 0); //true
alert(null <= 0); //true

//8.
function power(val, pow) {
    if (pow == 1) {
        return val;
    } else {
        return val * power(val, pow - 1);
    }
}
var val = Number(prompt("Какое число возводим в степень: "));
var pow = Number(prompt("В какую степень возмодим: "));
alert(power(val, pow));
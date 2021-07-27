function sum(a,b){
    return a + b
}

function substract(a,b) {
    return a - b
}

function mult(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function sqrt(a) {
    return  Math.floor(Math.sqrt(a) * 10) / 10
}

function percent(target,percent) {
    return (target/100) * percent
}

function operate(numb1,numb2,operator) {
    switch(operator) {
        case (operator === '+'):
            return sum(numb1,numb2)
        break;
        case (operator === '-'): 
            return substract(numb1,numb2)
            break;
        case (operator === '*'):
            return mult(numb1,numb2);
            break;
        case (operator === '/'):
            return divide(numb1,numb2);
            break;
        case (operator === 'sq'):
            return sqrt(numb1);
            break;
        case (operator === '%'):
            return percent(numb1, numb2)
            break;
        default:
            console.log(`${operator} is unknown.`)
            return;
    }  
}

const digitButtons = document.querySelectorAll('div#digits > button');
const digitButtonsArray = Array.from(digitButtons);
console.log(digitButtonsArray);
let hue = 0;
let saturation = 100;
let value = 50;
const paintDigits = () => {
    hue = 10;
    console.log(hue, saturation, value)
    digitButtonsArray.forEach(element => {
        element.style.backgroundColor = `hsl(${hue},${saturation}%,${value}%)`;
        //console.log(`hsl(${hue},${saturation}%,${value}%)`)
        saturation -= 25;
        if (saturation < 35) { hue += 5; saturation = 100;}
    })
}
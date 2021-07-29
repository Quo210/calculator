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

function power(a,b) {
    return a**b;
}

function operate(numb1,numb2,operator) {
    
    switch(operator) {
        case '+':
            return sum(numb1,numb2)
        case '-':
            return substract(numb1,numb2)
        case '*':
            return mult(numb1,numb2);
        case '/':
            return divide(numb1,numb2);
        case '√': 
            return sqrt(numb1);
        case '%':
            return percent(numb1,numb2);
        case '**':
            return power(numb1,numb2);
        default:
            console.log('There was an ERROR');
    }

}

const paintButtons = (hue,array) => {
    colorHue = hue;
    let myWorkArray = array;
    console.log(hue, saturation, value)
    myWorkArray.forEach(element => {
        element.style.backgroundColor = `hsl(${hue},${saturation}%,${value}%)`;
        //console.log(`hsl(${hue},${saturation}%,${value}%)`)
        saturation -= 25;
        if (saturation < 65) { hue += 5; saturation = 100;}  
        })
    }


// Paint me buttons

const digitButtons = document.querySelectorAll('div#digits > button');
const digitButtonsArray = Array.from(digitButtons);
console.log(digitButtonsArray);
let colorHue = 0;
let saturation = 100;
let value = 50;

// const paintDigits = () => {
//     hue = 195;
//     console.log(hue, saturation, value)
//     digitButtonsArray.forEach(element => {
//         element.style.backgroundColor = `hsl(${hue},${saturation}%,${value}%)`;
//         //console.log(`hsl(${hue},${saturation}%,${value}%)`)
//         saturation -= 25;
//         if (saturation < 35) { hue += 5; saturation = 100;}
//     })
// }
// Commented this out because repurposed this function to be used in several places


// Result population

const resultWindow = document.querySelector("p#resultNumber");
let storeNumb1 = undefined;
let storeNumb2 = undefined;
let storeOperator = undefined;
let storeResult;

function writeOnResultWindow() {
    if (resultWindow.textContent == 0 && this.textContent == ".") {
        resultWindow.textContent = '0.'
        return }
    
    (resultWindow.textContent.length == 1 && resultWindow.textContent == 0) ? 
    resultWindow.textContent = this.textContent:
    resultWindow.textContent += this.textContent;
} // This one only for digits

//The Dot
function dotWorksOnce() {
    digitButtonsArray[digitButtonsArray.length-1].removeEventListener('click',writeOnResultWindow);
    digitButtonsArray[digitButtonsArray.length-1].addEventListener('click',writeOnResultWindow, {once: true})
}

function listenButtons(){
    digitButtonsArray.forEach(element => {
        element.addEventListener('click',writeOnResultWindow);
        dotWorksOnce();
    })
}

function listenSymbols() {
    symbolButtonsArray.forEach(element => {
        element.addEventListener('click',writeSymbols);
    });
    clearButton.removeEventListener('click',writeSymbols);
    clearAllButton.removeEventListener('click',writeSymbols);
    equalButton.removeEventListener('click',writeSymbols);
    clearButton.addEventListener('click',clearOne);
    clearAllButton.addEventListener('click',clearResult)
    equalButton.addEventListener('click',calculateNshow)
};


// Clear Buttons

const clearButton = document.querySelector('button#clear');
const clearAllButton = document.querySelector('button#clearplus');
let lastRemoved = undefined; // From Result Window

const clearResult = () => {
    resultWindow.textContent = 0;
    dotWorksOnce()
}

const clearOne = () => {
    lastRemoved = resultWindow.textContent.substr(resultWindow.textContent.length-1);
    console.log(lastRemoved);
    let newStr = resultWindow.textContent.substr(0,resultWindow.textContent.length-1);
    (resultWindow.textContent.length === 1) ? resultWindow.textContent = 0 : resultWindow.textContent = newStr;
    if(lastRemoved == '.') dotWorksOnce();
}


// Symbol Buttons

const symbolButtonsArray = Array.from(document.querySelectorAll('div#symbols > button'));
const mathSymbols = ['+','-','*','/','%','√'];

function isItEqual(compare) {
    if (resultWindow.textContent.charAt(resultWindow.textContent.length-1) == compare) {
            return true
        } else { return false }  
}

let currentSymbol = undefined;

function writeSymbols() {
    currentSymbol = this.textContent;
    if (resultWindow.textContent.search(/\d+\.{1}$/) == 0) {
        alert('Try adding another number before a symbol')
    } else if (isItEqual(currentSymbol)==true){
        console.log('It\'s equal')
        resultWindow.textContent = resultWindow.textContent; 
    } else if (isItEqual(currentSymbol)==false) {
        if (resultWindow.textContent.charAt(resultWindow.textContent.length-1).search(/\d/) == 0 && resultWindow.textContent.search(/[\+\-\*\/\√]/) == -1) {
            resultWindow.textContent += currentSymbol;
        } else if (resultWindow.textContent.search(/[\+\-\*\/\√]/) == resultWindow.textContent.length-1 && resultWindow.textContent.charAt(0) != currentSymbol) {
            console.log('Found symbol on last index and it is not the same symbol')
            resultWindow.textContent = resultWindow.textContent.substr(0,resultWindow.textContent.length-1) + currentSymbol;
        }
    }

    storeNumb1 = parseFloat(resultWindow.textContent.substr(0,resultWindow.textContent.length-1)) 
    console.log(storeNumb1);
}

// Equal symbol

const equalButton = document.querySelector('button#equal');
function calculateNshow(){
    let symbolPosition = resultWindow.textContent.indexOf(currentSymbol);
    storeNumb2 = parseFloat(resultWindow.textContent.substr(symbolPosition+1)) 
    let finalResult = Math.round ( operate(storeNumb1,storeNumb2,currentSymbol) * 10 ) / 10;
    resultWindow.textContent = finalResult;
    storeNumb1 = parseFloat( finalResult ) 
}


// Script Activation Zone

paintButtons(1,digitButtonsArray)
paintButtons(25,symbolButtonsArray)
listenButtons();
listenSymbols();
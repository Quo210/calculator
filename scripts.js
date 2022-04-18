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
    if (b == 0) {alert('Very funny. You can\'t divide by zero')
                    return a}
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
    
    console.log(`Numb1 is ${numb1}, Numb2 is ${numb2} and operator is ${operator}`)

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


// Paint me some buttons

const digitButtons = document.querySelectorAll('div#digits > button');
const digitButtonsArray = Array.from(digitButtons);
console.log(digitButtonsArray);
let colorHue = 0;
let saturation = 100;
let value = 50;

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

    if (enterPushed === true) {
        alert('choose a symbol or delete one or more numbers to continue')
        return
    }
    
    (resultWindow.textContent.length == 1 && resultWindow.textContent == 0) ? 
    resultWindow.textContent = this.textContent:
    resultWindow.textContent += this.textContent;

} // <- Only numbers

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
    document.querySelector('div#symbols > button#guide').removeEventListener('click',writeSymbols)
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
    storeNumb1 = undefined;
    storeNumb2 = undefined;
    lastRemoved = undefined;
    dotWorksOnce()
    enterPushed = false;
    currentSymbol = undefined;
}

const clearOne = () => {
    lastRemoved = resultWindow.textContent.substr(resultWindow.textContent.length-1);
    console.log(lastRemoved);
    let newStr = resultWindow.textContent.substr(0,resultWindow.textContent.length-1);
    (resultWindow.textContent.length === 1) ? resultWindow.textContent = 0 : resultWindow.textContent = newStr;
    if(lastRemoved == '.') dotWorksOnce();
    enterPushed = false;
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
    if (resultWindow.textContent.search(/\d+\.?\d?[\+\-\*\/\√]+\d+\.?\d?/) != -1){
        console.log('Inviting an ERR')
        return 
    };

    if (resultWindow.textContent.charAt(0) == '-') {
        alert('Currently not working with inputed negative integers. Sorry!')
    }

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
    enterPushed = false;
}

// Equal symbol

let enterPushed = false; // Was enter pushed?

const equalButton = document.querySelector('button#equal');
function calculateNshow(){
    if (enterPushed == true) {
        alert("You just did that! Try adding more symbols or numbers first.")
        return
    }
    let symbolPosition = resultWindow.textContent.indexOf(currentSymbol);
    storeNumb2 = parseFloat(resultWindow.textContent.substr(symbolPosition+1)) 
    
    if (storeNumb1 == undefined || storeNumb2 == undefined) {
        alert('We require two numbers to calculate something! Try writing more.')
        return
    }
    let finalResult = Math.round ( operate(storeNumb1,storeNumb2,currentSymbol) * 10 ) / 10;
    resultWindow.textContent = finalResult;
    storeNumb1 = parseFloat( finalResult )
    storenumb2 = undefined;
    enterPushed = true;
}

// KEYBOARD support

function giveKeystoDigits() {
    let counter = 0;
    digitButtonsArray.forEach(element => {
        element.setAttribute('data-key',`Numpad${counter}`);
        counter++;
    })
    digitButtonsArray[digitButtonsArray.length-1].setAttribute('data-key',"NumpadDecimal");
}

let keyCode;
function keyBoardSupport() {
    
    window.addEventListener('keydown',(e) => {
        keyCode = e.code
        let currentKey = document.querySelector(`button[data-key="${keyCode}"]`);
        if (!currentKey) {
            return
        } else {
            currentKey.click()
        }
    })
  
   }


// Guidelines Button

const guideButton = document.querySelector('div#symbols > button#guide');
const hideGuide = () => {
    document.querySelector('div#guideDiv').style.visibility = 'hidden';
};

guideButton.addEventListener('click', () => {
    console.log(document.querySelector('div#guideDiv').style.visibility)
    if (document.querySelector('div#guideDiv').style.visibility == 'hidden') {
        document.querySelector('div#guideDiv').style.visibility = 'visible'
        guideButton.textContent = 'Hide Project\'s Guidelines'
        guideButton.style.backgroundColor = 'red'
    } else {
        document.querySelector('div#guideDiv').style.visibility = 'hidden';
        guideButton.textContent = 'Show Project\'s Guidelines'
        guideButton.style.backgroundColor = 'yellow'
    }
    
})

// Script Initialization Zone

paintButtons(1,digitButtonsArray)
paintButtons(25,symbolButtonsArray)
listenButtons();
listenSymbols();
giveKeystoDigits();
keyBoardSupport();
hideGuide();
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U",
    "V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
    "u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$",
    "%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const charNoSymbol = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U",
    "V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
    "u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const charNoNumber = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U",
    "V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
    "u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}",
    "]",",","|",":",";","<",">",".","?","/"];

const charNoBoth = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U",
    "V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t",
    "u","v","w","x","y","z"];

const numberInput = document.getElementById('user-number');
const resultDiv = document.getElementById('result');
const passwordEl = document.getElementById('password');
const numButton = document.getElementById('num-button');
const symButton = document.getElementById('sym-button');
const toast = document.getElementById('copiedToast');
let chosenValue = 8; // default password length value
let generated = false;
let NoNum = false;
let NoSym = false;

function generate(chosenValue) {
    generated=true;
    passwordEl.textContent = ""
    if(NoNum==true && NoSym==true) {
        generateCharNoBoth(chosenValue);
    } else if(NoNum==true && NoSym==false) {
        generateCharNoNum(chosenValue);
    } else if(NoNum==false && NoSym==true) {
        generateCharNoSym(chosenValue);
    } else if(NoNum==false && NoSym==false) {
        generateChar(chosenValue);
    }
}

// function for all characters
function generateChar(chosenValue) {
    for(let i=0;i<chosenValue;i++) {
    let randomNum = Math.floor(Math.random()*characters.length)
    passwordEl.textContent += characters[randomNum]
    }
}

// function for NoSym
function generateCharNoSym(chosenValue) {
    for(let i=0;i<chosenValue;i++) {
    let randomNum = Math.floor(Math.random()*charNoSymbol.length)
    passwordEl.textContent += charNoSymbol[randomNum]
    }
}

// function for NoNum
function generateCharNoNum(chosenValue) {
    for(let i=0;i<chosenValue;i++) {
    let randomNum = Math.floor(Math.random()*charNoNumber.length)
    passwordEl.textContent += charNoNumber[randomNum]
    }
}

// fucntion for NoNum + No Sym
function generateCharNoBoth(chosenValue) {
    for(let i=0;i<chosenValue;i++) {
        let randomNum = Math.floor(Math.random()*charNoBoth.length)
        passwordEl.textContent += charNoBoth[randomNum]
    }
}

// password length validator
    numberInput.addEventListener('input', function() {
    const newValue = Number(numberInput.value);

    if(newValue < 8 || newValue > 72) {
        numberInput.style.color = '#f02d3a';
        return;
    } else {
        numberInput.style.color = '#10B981'
    }

    chosenValue = newValue;
    if(generated==true) {
        generate(chosenValue);
    }
});

function numToggle() {
    NoNum=!NoNum;

    if(NoNum==true) {
        numButton.style.background = '#374151';
    } else {
        numButton.style.background = '#10B981';
    }

    if(generated==true) {
        generate(chosenValue);
    } else {
        return;
    }
}

function symToggle() {
    NoSym=!NoSym;

    if(NoSym==true) {
        symButton.style.background = '#374151';
    } else {
        symButton.style.background = '#10B981';
    }

    if(generated==true) {
        generate(chosenValue);
    } else {
        return;
    }
}

passwordEl.addEventListener('click', function() {
    const passToCopy = this.textContent.trim();

    if(passToCopy) {
        navigator.clipboard.writeText(passToCopy).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 1200); // 1.2 seconds
    });
    }
});
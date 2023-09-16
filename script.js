let result = document.getElementById("result");
let clipboard = document.getElementById("clipboard");
let lengthEl = document.getElementById("length");
let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let generate = document.getElementById("generate");

let randomFunc = {
    upper: randomUpper,
    lower: randomLower,
    number: randomNumber,
    symbol: randomSymbol
}

clipboard.addEventListener("click", () => {
  let textarea = document.createElement("textarea");
  let password = result.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});

generate.addEventListener("click", () => {
  let length = +lengthEl.value;
  let yesUpper = uppercase.checked;
  let yesLower = lowercase.checked;
  let yesNumbers = numbers.checked;
  let yesSymbols = symbols.checked;

  result.innerText = generatePassword(yesUpper, yesLower, yesNumbers, yesSymbols, length);
});

// A function for generating password
let generatePassword = (upper, lower, number, symbol, length) => {
  let generatedPassword = '';


  //this represents the total number of character types selected 
  let typesCount = upper + lower + number + symbol;
  let typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // doesn't have selected type

  if (typesCount === 0) {
    return "";
  }

  // loop for desired length 

  for (let i = 0; i<length; i+=typesCount) {
    typesArr.forEach(type => {
        let funcName = Object.keys(type)[0]
        generatedPassword += randomFunc[funcName]();
    })
  }
  // slice the extra length of generated password 
  let finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
};


// Helper functions for generating random characters
function randomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function randomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)
    
}

function randomSymbol() {
    let symbols = '!@#$%&'
    return symbols[Math.floor(Math.random() * symbols.length)]
}


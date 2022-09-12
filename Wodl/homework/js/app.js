import {
    dictionary
} from './dictionary.js';

const checkButton = document.getElementById('check');
const resetButton = document.getElementById('reset');
const gameBoard = document.getElementById('board');
let inputListValues = [];
let step = 0;

let numberOfFilledLetters = 0;
let randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];

for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        let input = document.createElement('input');
        input.classList.add('square-input');
        input.classList.add('index-' + j);
        input.setAttribute('id', j + step);
        gameBoard.appendChild(input);
    }
    step += 5;
}

let inputList = document.querySelectorAll('input.square-input');

for (let i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener('input', () => {
        if (inputList[i].value.length) {
            if (inputList[i].classList.contains('index-4')) {
                inputList[i].blur()
                checkButton.classList.remove('disabled-button');
                checkButton.removeAttribute('disabled');
            } else {
                document.getElementById(`${i + 1}`).focus();
            }
        }
    });
}

const getAllInputValuesWithIndex = () => {
   inputListValues = [];
    for (let [index, input] of inputList.entries()) {
        if (input.value) {
            inputListValues.push({
                'letter': input.value.toLowerCase(),
                'index': index
            });
        }
    }  
};

const checkIfIncludesLetter = () => {

    const splittedRandomWord = randomWord.toLowerCase().split('');
    const sameLetters = inputListValues.filter((item) => splittedRandomWord.includes(item.letter));
    const differentLetters = inputListValues.filter((item) => !splittedRandomWord.includes(item.letter));

    sameLetters.forEach((item) => {
        if (item.letter !== splittedRandomWord[item.index]) {
            inputList[item.index].classList.add('highlight-orange');
        } 
    });
    
    differentLetters.forEach((item) => {
        inputList[item.index].classList.add('higlight-gray');
    });

};

checkButton.addEventListener('click', () => {
    getAllInputValuesWithIndex();

    const wordInRow = inputListValues
    .slice(numberOfFilledLetters, numberOfFilledLetters + 5)
    .map((item) => item.letter)
    .join('');
    
    if (!dictionary.includes(wordInRow)) {
        
        alert('Not word in list.');
        for (let i = inputListValues.length - 1; i > inputListValues.length - 6; i--) {
            inputList[i].value = '';
        }
        
    } else {
        numberOfFilledLetters +=5;
        for (let i = 0; i < 5; i++) {
            const elementList = document.querySelectorAll('input.index-' + i);
            for (let j = 0; j < elementList.length; j++) {
                if (randomWord[i].toLowerCase() === elementList[j].value.toLowerCase()) {
                    elementList[j].classList.add('highlight-green');
                } 
            }
        }
        if(randomWord === wordInRow) {
            alert('Congratulations! You won.');
        } else if(inputListValues.length === 30) {
            alert('Game over!')   
            checkButton.classList.add('disabled-button');
            checkButton.setAttribute('disabled', true);
        } else {
            checkIfIncludesLetter();
        }
    }
    if(numberOfFilledLetters < 29) { 
        inputList[numberOfFilledLetters].focus();
    }

});

resetButton.addEventListener('click', () => {
    location.reload();
});
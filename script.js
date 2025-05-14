'use strict';

let scoreValue = 6
const number = document.querySelector(".number")
const userGuess = document.querySelector(".guess")
const score = document.querySelector(".score")
const highscore = document.querySelector(".highscore")
const message = document.querySelector(".message")
const btnCheck = document.querySelector(".check")
const body = document.querySelector("body")
const btnAgain = document.querySelector(".again")
let secretNumber;

function generateNumber(){
    return Math.floor(Math.random() * 20) + 1;
}

function updateScore(){
    score.textContent = scoreValue
}

function setButtonDisabled(){
    btnCheck.disabled ? btnCheck.disabled = false: btnCheck.disabled = true
}
const checkInterval = num => num > 20 || num <= 0

function isCorrectGuess(num){
    return num === secretNumber 
}

function checkHighscore(userValue, highscoreValue) {
    if (userValue > highscoreValue) {
        highscore.textContent = userValue 
    }
}

function reduceTry(){
    scoreValue--
    updateScore()
}


function showMessage (userEntrance) {

    if(userEntrance > secretNumber) {
        message.textContent = "Too hight 📈"
    } 
    else if (userEntrance < secretNumber){
        message.innerText = "Too low 📉"
    } else {
        message.innerText = "Correct number 🎉🎉"
    }

    
} 

secretNumber = generateNumber()

function game(){

    const userEntrance = Number(userGuess.value)
    const highscoreValue = Number(highscore.textContent)
    const range = checkInterval(userEntrance)

    if (scoreValue > 0 ){
        if( range){
            alert("Number out of range")
            userGuess.value = ""
            return
        }
        
        if (isCorrectGuess(userEntrance)){
            showMessage(userEntrance)
            number.textContent = secretNumber
            body.classList.add("winner")
            checkHighscore(userEntrance, highscoreValue)
            return
        }
    
        userGuess.value = ""
        showMessage(userEntrance)
        reduceTry()

    } else {
        number.textContent = secretNumber
        setButtonDisabled()
        body.classList.add("loser")
        message.innerText = "You lost 😔😔😔"
        updateScore()
    }

}
const resetGame = () =>{
    number.textContent = "?"
    userGuess.value = ""
    scoreValue = 6
    score.textContent = scoreValue
    body.classList.remove("winner","loser")
    secretNumber = generateNumber()
    setButtonDisabled()
}


// Buttons events
btnCheck.addEventListener("click", game)
btnAgain.addEventListener("click", resetGame)
updateScore()

userGuess.addEventListener('keydown', (e)=>{
    if (['e', '+', '-',',','.'].includes(e.key)){
        e.preventDefault()
    }
})
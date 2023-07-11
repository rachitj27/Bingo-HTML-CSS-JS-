var square = document.querySelectorAll(".square")
var par = document.getElementById("numbersParagraph")
var par2 = document.getElementById("messageParagraph")
var button = document.getElementById("startGame")
var musicButton = document.getElementById("epicMusic")
var audio = document.getElementById("audio")
var audio2 = document.getElementById("audio2")
var bingoNumber = 0
var game = false
var intervalId
musicButton.addEventListener("click", playSound)
for (var i = 0; i < square.length; i++) {
  square[i].addEventListener("click", changeColor)
  button.addEventListener("click", startGame)
}

var winningCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
var bingoCard = []
var drawnNumbers = []
function playSound() {
  audio.play()
  musicButton.innerHTML = "Pause Epic Music"
  //if (musicButton.innerHTML == "Pause Epic Music") {
   // audio.stop()
  //}
  
}
function startGame() {
  button.style.display = "none"
  //audio2.play()
  intervalId = setInterval(newNumbers, 2000)
  generateNumbers()
}
function changeColor() {
  console.log(this.innerHTML)
  if (game == true) {
    for (var i = 0; i < drawnNumbers.length; i++) {
      console.log(drawnNumbers[i])
      if (drawnNumbers[i] == this.innerText) {
        this.classList.add("marked")
        break
      }
    }
    if (checkWinningCondition() == true) {
      par2.innerHTML = "YOU'RE LUCKY"
      clearInterval(intervalId)
    }
  }
}
function generateNumbers() {
  game = true
  for (var i = 0; i < square.length; i++) {
    var number = Math.floor(Math.random() * 40)
    bingoCard.push(number)
    square[i].innerHTML = number
  }
}
function newNumbers() {
  var alreadyExists = false

  var generateBingoNumbers = Math.floor(Math.random() * 40)

  do {
    alreadyExists = false
    for (var i = 0; i < drawnNumbers.length; i++) {
      if (generateBingoNumbers == drawnNumbers[i]) {
        alreadyExists = true
        generateBingoNumbers = Math.floor(Math.random() * 40)
      }
    }
  } while (alreadyExists == true)

  drawnNumbers.push(generateBingoNumbers)
  bingoNumber++
  par.innerHTML = par.innerHTML + `${generateBingoNumbers} || `
  if (bingoNumber == 25) {
    clearInterval(intervalId)
    setTimeout(showLoseMessage, 2000)

  }

}
function showLoseMessage() {
  game = false
  par2.innerHTML = "YOU'RE GARBAGE"
}
function checkWinningCondition() {
  for (var r = 0; r < winningCondition.length; r++) {
    var sideNumbers = winningCondition[r]
    console.log(square[sideNumbers[0]].classList.contains("marked"))
    if (game == true) {
      if (square[sideNumbers[0]].classList.contains("marked") && square[sideNumbers[1]].classList.contains("marked") && square[sideNumbers[2]].classList.contains("marked")) {
        return true
        break
      }
    }
  }
}
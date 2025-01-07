let randomNumberList = [];
let limitNumber = 100;
let secretNumber = generateRandomNumber();
let attempts = 1;

function showText(tag, text) {
  let field = document.querySelector(tag);
  field.innerHTML = text;

  responsiveVoice.speak(text, "Brazilian Portuguese Female", { rate: 1.2 });
}

function showInitialMessage() {
  showText("h1", "Jogo do número secreto");
  showText("p", "Escolha um número entre 1 e 100");
}

showInitialMessage();

function shootVerify() {
  let guessNumber = document.querySelector("input").value;

  if (guessNumber == secretNumber) {
    let attemptWord = attempts > 1 ? "tentativas" : "tentativa";
    let attemptMessage = `Parabéns! Você descobriu o número secreto com ${attempts} ${attemptWord}.`;

    showText("h1", "Acertou!");
    showText("p", attemptMessage);

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (guessNumber > secretNumber) {
      showText("p", "O número secreto é menor.");
    } else {
      showText("p", "O número secreto é maior.");
    }
    attempts++;
    cleanField();
  }
}

function generateRandomNumber() {
  let chosenNumber = Math.floor(Math.random() * limitNumber + 1);
  let elementNumber = randomNumberList.length;

  if (elementNumber == limitNumber) {
    randomNumberList = [];
  }

  if (randomNumberList.includes(chosenNumber)) {
    return generateRandomNumber();
  } else {
    randomNumberList.push(chosenNumber);
    console.log(randomNumberList);
    return chosenNumber;
  }
}

function cleanField() {
  guessNumber = document.querySelector("input");
  guessNumber.value = "";
}

function restartGame() {
  secretNumber = generateRandomNumber();
  cleanField();

  attempts = 1;
  showInitialMessage();

  document.getElementById("reiniciar").setAttribute("disabled", true);
}

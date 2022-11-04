const rockPaperScissors = ['🤘', '🧻', '✂'];

let isOn = true;

const computerSelection = () => {
  const random = Math.floor(Math.random() * rockPaperScissors.length);
  return rockPaperScissors[random];
};

let humanScore = 0;
let pcScore = 0;

const startGame = e => {
  const mySelection = e.target.innerText;
  const result = checkWinner(mySelection, computerSelection());
  if (result.includes('Player wins')) {
    humanScore++;
  } else if (result.includes('Computer wins')) {
    pcScore++;
  }

  const gameResult = document.querySelector('.game-result');
  gameResult.innerText = `${humanScore} ${result} ${pcScore}`;
};

const checkWinner = (you, computer) => {
  if (you === computer) {
    return 'Its a draw';
  } else if (you === '🤘') {
    return computer === '🧻' ? 'Computer wins' : 'Player wins';
  } else if (you === '🧻') {
    return computer === '✂' ? 'Computer wins' : 'Player wins';
  } else if (you === '✂') {
    return computer === '🤘' ? 'Computer wins' : 'Player wins';
  }
};

const play = e => {
  if (isOn) {
    const machineDecision = computerSelection();
    const myDecision = e.target.innerText;
    const result = checkWinner(myDecision, machineDecision);
    console.log(result);

    if (result.includes('Player')) {
      humanScore++;
    } else if (result.includes('Computer')) {
      pcScore++;
    }

    const gameResult = document.querySelector('.game-result');
    gameResult.innerHTML = `
    <span>${humanScore}</span> --${result}-- <span>${pcScore}</span>`;

    const options = document.querySelectorAll('.options');

    for (const option of options) {
      option.classList.add('hidden');

      setTimeout(() => {
        option.classList.remove('hidden');
      }, 1000);
    }

    const decisions = document.querySelectorAll('.decision');
    decisions[0].innerText = myDecision;
    decisions[1].innerText = machineDecision;

    for (const decision of decisions) {
      decision.classList.remove('hidden');

      setTimeout(() => {
        decision.classList.add('hidden');
      }, 1000);
    }
  }

  if (humanScore === 3 || pcScore === 3) {
    isOn = false;
  }
};

const options = document.querySelectorAll('.opponent.player .option-item');
options.forEach(element => {
  element.addEventListener('click', e => {
    play(e);
  });
});

const input = document.querySelector('input');
const btnSubmit = document.querySelector('.btn-submit');

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  fillGridContainer(16);
}

// Button to submit number of grid cells the user wants
btnSubmit.addEventListener('click', e => {
  e.preventDefault();
  container.innerHTML = '';

  if (Number(input.value > 40)) {
    console.log('TOO BIG OF A NUMBER');
  } else {
    fillGridContainer(input.value);
    input.value = '';
    input.focus();
  }
});

const container = document.getElementById('container');

function fillGridContainer(num) {
  // Create the necessary number of cells
  for (let i = 0; i < num * num; i++) {
    const div = document.createElement('div');
    container.appendChild(div).classList.add('grid-cell');
  }

  // Display the grid layout
  container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${num}, 1fr)`;
}

function makeItRainbow(e) {
  const random = Math.floor(Math.random() * 16777215).toString(16);
  return (e.target.style.backgroundColor = `#${random}`);
}

function makeItBlack(e) {
  return (e.target.style.backgroundColor = `rgb(0, 0, 0)`);
}

function eraser(e) {
  return (e.target.style.backgroundColor = `#fff`);
}

// Select every button and give each one an event listener.
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button =>
  button.addEventListener('click', e => {
    // Check which button was clicked
    const type = e.currentTarget.classList[1];

    // Select all grid cells and give them a mouseover event listener
    const allCells = document.querySelectorAll('.grid-cell');

    // Depending and the class of the button, the grid cells will be coloured differently
    allCells.forEach(cell => {
      cell.addEventListener('mouseover', e => {
        if (type === 'black') {
          makeItBlack(e);
        }
        if (type === 'rainbow') {
          makeItRainbow(e);
        }
        if (type === 'eraser') {
          eraser(e);
        }
      });
    });
  })
);

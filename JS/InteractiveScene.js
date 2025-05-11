const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

const slider = document.getElementById('positionSlider');
const radios = document.querySelectorAll('input[name="bg"]');
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');

let posX = parseInt(slider.value);
let posY = 300;
let direction = 'right';
let background = 'bg1';

// Sound Effects
const sound1 = new Audio('Sound/pacman.wav');
const sound2 = new Audio('Sound/gameloop.wav');
const sound3 = new Audio('Sound/gamebleeps.wav');

document.getElementById('sound1').onclick = () => sound1.play();
document.getElementById('sound2').onclick = () => sound2.play();
document.getElementById('sound3').onclick = () => sound3.play();

// Events
slider.oninput = () => {
  posX = parseInt(slider.value);
  drawScene();
};

radios.forEach(radio => {
  radio.onchange = () => {
    background = radio.value;
    drawScene();
  };
});

[item1, item2, item3].forEach(item => item.onchange = drawScene);

// Drawing Functions
function drawPacMan(x, y, radius, mouthAngle, direction = 'right') {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  let start = mouthAngle;
  let end = 2 * Math.PI - mouthAngle;

  switch (direction) {
    case 'left':
      start += Math.PI;
      end += Math.PI;
      break;
    case 'up':
      start -= Math.PI / 2;
      end -= Math.PI / 2;
      break;
    case 'down':
      start += Math.PI / 2;
      end += Math.PI / 2;
      break;
  }

  ctx.moveTo(x, y);
  ctx.arc(x, y, radius, start, end, false);
  ctx.closePath();
  ctx.fill();
}

function drawCherry(x, y) {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x - 7, y, 10, 0, Math.PI * 2); // Left cherry
  ctx.arc(x + 7, y, 10, 0, Math.PI * 2); // Right cherry
  ctx.fill();
}

function drawStrawberry(x, y) {
  ctx.fillStyle = 'mediumvioletred';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y + 16, 16, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
}

function drawOrange(x, y) {
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.arc(x, y, 14, 0, Math.PI * 2);
  ctx.fill();
}

// Draw Scene
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  switch (background) {
    case 'bg1':
      ctx.fillStyle = 'black'; //Dark Room 
      break;
    case 'bg2':
      ctx.fillStyle = 'darkslategray'; // City Life
      break;
    case 'bg3':
      ctx.fillStyle = 'turquoise'; // Vacation
      break;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Pac-Man
  drawPacMan(posX, posY, 20, Math.PI / 6, direction);

  // Fruits
  if (item1.checked) drawCherry(100, 100);
  if (item2.checked) drawStrawberry(200, 100);
  if (item3.checked) drawOrange(300, 100);
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      posX -= 5;
      direction = 'left';
      break;
    case 'ArrowRight':
      posX += 5;
      direction = 'right';
      break;
    case 'ArrowUp':
      posY -= 5;
      direction = 'up';
      break;
    case 'ArrowDown':
      posY += 5;
      direction = 'down';
      break;
  }

  slider.value = posX;
  drawScene();
});

// Initial draw
drawScene();

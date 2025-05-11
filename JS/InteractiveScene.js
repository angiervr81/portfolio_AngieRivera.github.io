const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

const slider = document.getElementById('positionSlider');
const radios = document.querySelectorAll('input[name="bg"]');
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');

let posX = parseInt(slider.value);
let background = 'bg1';

// Sound Effects
const sound1 = new Audio('sound1.mp3');
const sound2 = new Audio('sound2.mp3');
const sound3 = new Audio('sound3.mp3');

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
  if (direction === 'left') {
    start += Math.PI;
    end += Math.PI;
  }
  ctx.moveTo(x, y);
  ctx.arc(x, y, radius, start, end, false);
  ctx.closePath();
  ctx.fill();
}

function drawCherry(x, y) {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x - 5, y, 7, 0, Math.PI * 2); // Left cherry
  ctx.arc(x + 5, y, 7, 0, Math.PI * 2); // Right cherry
  ctx.fill();
}

function drawStrawberry(x, y) {
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x, y + 10, 10, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
}

function drawOrange(x, y) {
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();
}

// Draw Scene
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  switch (background) {
    case 'bg1':
      ctx.fillStyle = '#87CEEB'; // Beach
      break;
    case 'bg2':
      ctx.fillStyle = '#228B22'; // Forest
      break;
    case 'bg3':
      ctx.fillStyle = '#A9A9A9'; // City
      break;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Pac-Man
  drawPacMan(posX, 300, 20, Math.PI / 6);

  // Fruits
  if (item1.checked) drawCherry(100, 100);
  if (item2.checked) drawStrawberry(200, 100);
  if (item3.checked) drawOrange(300, 100);
}

// Initial draw
drawScene();

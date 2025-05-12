// Example: Drawing a planet on the canvas
window.onload = function() {
  const canvas = document.getElementById('planet-canvas');
  const ctx = canvas.getContext('2d');

  // Draw a planet (e.g., Earth)
  ctx.beginPath();
  ctx.arc(150, 200, 50, 0, Math.PI * 2);  // Draw circle (Earth)
  ctx.fillStyle = '#3399FF';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003366';
  ctx.stroke();

    // Load planet data from JSON and display it
  fetch('planet.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(planet => {
        const section = document.createElement('div');
        section.innerHTML = `
          <h3>${planet.name}</h3>
          <p>${planet.description}</p>
          <img src="images/${planet.image}" alt="${planet.name}" width="150">
        `;
        document.getElementById('moons-content').appendChild(section);
      });
    });

  // Example function to change planet data dynamically (for educational content)
  function updatePlanetInfo(planetName) {
    const infoSection = document.getElementById('planets');
    if (planetName === 'Earth') {
      infoSection.innerHTML = `
        <h2>Earth</h2>
        <p>Earth is the third planet from the Sun and the only known planet to support life.</p>
      `;
    }
  }
};

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log("Service Worker registered", reg))
    .catch(err => console.error("Service Worker registration failed", err));
}

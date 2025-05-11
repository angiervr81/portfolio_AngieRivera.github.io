document.getElementById('csvFileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        processCSVData(results.data);
      }
    });
  }
}

function processCSVData(data) {
  // Assuming the columns are 'Airline' and 'Delay'
  const delayCounts = {};

  data.forEach(row => {
    const airline = row.Airline;
    const delay = parseInt(row.Delay || row["Total Delay"] || 0);

    if (!isNaN(delay)) {
      if (delayCounts[airline]) {
        delayCounts[airline] += delay;
      } else {
        delayCounts[airline] = delay;
      }
    }
  });

  // Get top 5-10 airlines by delay count
  const sorted = Object.entries(delayCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);

  const labels = sorted.map(item => item[0]);
  const dataValues = sorted.map(item => item[1]);

  renderCharts(labels, dataValues);
}

function renderCharts(labels, data) {
  const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8E44AD'];

  // Doughnut Chart
  new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'Flight Delays (by John Doe)',
        data: data,
        backgroundColor: backgroundColors
      }]
    }
  });

  // Horizontal Bar Chart
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Flight Delays (by John Doe)',
        data: data,
        backgroundColor: backgroundColors
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}

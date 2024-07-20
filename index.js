document.addEventListener('DOMContentLoaded', function() {
  fetch('cpudata.csv')
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      const rows = data.trim().split('\n').slice(1); // Remove header row
      const dates = [];
      const values1 = [];
      const values2 = [];

      rows.forEach(row => {
        const [date, value1, value2] = row.split(',');
        dates.push(date);
        values1.push(parseFloat(value1));
        values2.push(parseFloat(value2));
      });

      // Create traces
      const trace1 = {
        x: dates,
        y: values1,
        type: 'scatter',
        mode: 'lines',
        name: 'CPU Observed',
        line: {
          color: 'orange', 
          width: 2
        }
      };

      const trace2 = {
        x: dates,
        y: values2,
        type: 'scatter',
        mode: 'lines',
        name: 'CPU Simulated',
        line: {
          color: 'royalblue', 
          width: 2
        }
      };

      const chartData = [trace1, trace2];

      const layout = {
        title: 'Time Series Simulation',
        xaxis: {
          title: 'Date',
          range: [0,366],
          tickangle: 0,
          tickvals: ['2023/1/1', "2023/4/1", "2023/7/1", "2023/10/1", "2023/12/31"]
        },
        yaxis: { 
          title: '% CPU Usage'
        },
        width: 1700
      };

      Plotly.newPlot('myDiv', chartData, layout);
    });
});

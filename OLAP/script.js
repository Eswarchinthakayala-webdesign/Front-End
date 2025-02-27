document.getElementById('fileInput').addEventListener('change', handleFile);

let dataset = [];
let filteredData = [];
let chartInstance = null;

function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            complete: function(results) {
                dataset = results.data;
                filteredData = [...dataset];
                initializeDropdowns();
                updateChart();
            },
            header: true,
            skipEmptyLines: true
        });
    }
}

function initializeDropdowns() {
    const keys = Object.keys(dataset[0]);
    const xColumnSelect = document.getElementById("xColumn");
    const yColumnSelect = document.getElementById("yColumn");

    xColumnSelect.innerHTML = yColumnSelect.innerHTML = "";

    keys.forEach(key => {
        let optionX = document.createElement("option");
        let optionY = document.createElement("option");

        optionX.value = optionY.value = key;
        optionX.textContent = optionY.textContent = key;

        xColumnSelect.appendChild(optionX);
        yColumnSelect.appendChild(optionY);
    });

    updateChart();
}

function applyOlapOperation() {
    let olapOp = document.getElementById("olapOp").value;

    if (olapOp === "none") {
        filteredData = [...dataset];
    } else if (olapOp === "drilldown") {
        filteredData = dataset.sort((a, b) => parseFloat(a[document.getElementById("yColumn").value]) - parseFloat(b[document.getElementById("yColumn").value]));
    } else if (olapOp === "rollup") {
        let sum = dataset.reduce((acc, row) => acc + parseFloat(row[document.getElementById("yColumn").value] || 0), 0);
        filteredData = [{ [document.getElementById("xColumn").value]: "Total", [document.getElementById("yColumn").value]: sum }];
    } else if (olapOp === "slice") {
        filteredData = dataset.slice(0, Math.floor(dataset.length / 2));
    } else if (olapOp === "dice") {
        let xCol = document.getElementById("xColumn").value;
        let yCol = document.getElementById("yColumn").value;
        let uniqueValues = [...new Set(dataset.map(row => row[xCol]))].slice(0, 3);
        filteredData = dataset.filter(row => uniqueValues.includes(row[xCol]));
    } else if (olapOp === "pivot") {
        createPivotTable();
        return;
    } else if (olapOp === "drillthrough") {
        alert("Click on a chart bar to see detailed data!");
        return;
    }

    updateChart();
}

function createPivotTable() {
    let xColumn = document.getElementById("xColumn").value;
    let yColumn = document.getElementById("yColumn").value;
    let pivotTable = document.getElementById("pivotTable");

    pivotTable.innerHTML = "";

    let aggregatedData = {};

    dataset.forEach(row => {
        let key = row[xColumn];
        let value = parseFloat(row[yColumn]) || 0;

        if (!aggregatedData[key]) {
            aggregatedData[key] = 0;
        }

        aggregatedData[key] += value;
    });

    let tableHTML = `<tr><th>${xColumn}</th><th>${yColumn}</th></tr>`;
    for (let key in aggregatedData) {
        tableHTML += `<tr><td>${key}</td><td>${aggregatedData[key]}</td></tr>`;
    }

    pivotTable.innerHTML = tableHTML;
}

function updateChart() {
    let xColumn = document.getElementById("xColumn").value;
    let yColumn = document.getElementById("yColumn").value;
    let chartType = document.getElementById("chartType").value;

    let labels = filteredData.map(row => row[xColumn]);
    let values = filteredData.map(row => parseFloat(row[yColumn]) || 0);

    const ctx = document.getElementById('chartCanvas').getContext('2d');

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: yColumn,
                data: values,
                backgroundColor: ['blue', 'red', 'green', 'orange', 'purple'],
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: true } },
            onClick: function(evt, elements) {
                if (elements.length && document.getElementById("olapOp").value === "drillthrough") {
                    let index = elements[0].index;
                    alert(`Drill-Through Details:\n${JSON.stringify(filteredData[index], null, 2)}`);
                }
            }
        }
    });
}

function exportCSV() {
    let csvContent = "data:text/csv;charset=utf-8," + Papa.unparse(filteredData);
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
}

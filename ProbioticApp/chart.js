const ctx = document.getElementById("probioticChart").getContext("2d");

const data = {
    labels: ["Daily Probiotic", "Advanced Gut Health", "Probiotic + Prebiotic"],
    datasets: [{
        label: "Survival Rate (%)",
        data: [60, 75, 85],
        backgroundColor: ["red", "blue", "green"]
    }, {
        label: "Effectiveness (%)",
        data: [70, 80, 90],
        backgroundColor: ["orange", "purple", "cyan"]
    }]
};

const probioticChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

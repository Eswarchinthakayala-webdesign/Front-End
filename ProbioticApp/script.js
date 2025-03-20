document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("probioticForm");
    const tableBody = document.querySelector("#probioticTable tbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const survivalRate = document.getElementById("survivalRate").value;
        const effectiveness = document.getElementById("effectiveness").value;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${survivalRate}</td>
            <td>${effectiveness}</td>
        `;

        tableBody.appendChild(newRow);
        form.reset();
    });
});

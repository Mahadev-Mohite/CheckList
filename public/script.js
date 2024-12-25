// Fetch checklist results and populate the table
async function loadChecklistResults() {
    try {
        const response = await fetch("/evaluate");
        const results = await response.json();
        const tableBody = document.getElementById("checklist-results");

        tableBody.innerHTML = results
            .map(
                (result) => `
                <tr>
                    <td>${result.rule}</td>
                    <td>${result.description}</td>
                    <td class="${result.status.toLowerCase()}">${result.status}</td>
                </tr>
            `
            )
            .join("");
    } catch (error) {
        console.error("Error loading checklist results:", error);
    }
}

loadChecklistResults();

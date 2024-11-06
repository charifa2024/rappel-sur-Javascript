function getPrixProduit(product) {
    switch (product) {
        case "Sac à main":
            return 150;
        case "Chemise":
            return 100;
        case "Pantalon":
            return 100;
        case "Cravate":
            return 50;
        default:
            return 0;
    }
}

function addTransaction() {
    const product = document.getElementById("product").value;
    const price = getPrixProduit(product);
    const quantity = parseInt(document.getElementById('quantity').value);
    const tva = parseFloat(document.getElementById('tva').value);

    if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
        alert("Veuillez saisir des informations valides.");
        return;
    }

    const total = price * quantity;
    const tableBody = document.getElementById('transactionTable').querySelector('tbody');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product}</td>
        <td>${price} MAD</td>
        <td>${quantity}</td>
        <td>${total.toFixed(2)} MAD</td>
        <td><button onclick="deleteTransaction(this)">Supprimer</button></td>
    `;
    tableBody.appendChild(row);

    updateTotals(tva);
}

function deleteTransaction(button) {
    const row = button.closest('tr');  // Utilisation de `closest('tr')` pour trouver la ligne parente
    row.remove();
    const tva = parseFloat(document.getElementById('tva').value);
    updateTotals(tva);
}

function updateTotals(tva) {
    const tableBody = document.getElementById('transactionTable').querySelector('tbody');
    let totalHT = 0;

    for (const row of tableBody.rows) {
        const rowTotal = parseFloat(row.cells[3].textContent);
        totalHT += rowTotal;
    }

    const totalTTC = totalHT * (1 + tva / 100);
    document.getElementById('totalHT').textContent = `${totalHT.toFixed(2)} MAD`;
    document.getElementById('totalTTC').textContent = `${totalTTC.toFixed(2)} MAD`;
}

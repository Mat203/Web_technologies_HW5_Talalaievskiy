function createTableCells(rowAmount, cellsAmount) {
    const table = document.createElement('table');

    for (let i = 0; i < rowAmount; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cellsAmount; j++) {
            const cell = document.createElement('td');
            cell.innerText = `Row ${i+1}, Cell ${j+1}`;
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    document.body.appendChild(table);
}
export function buildTable(parent: HTMLElement | null) {
    const MOUNTAINS = [
        { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
        { name: "Everest", height: 8848, place: "Nepal" },
        { name: "Mount Fuji", height: 3776, place: "Japan" },
        { name: "Vaalserberg", height: 323, place: "Netherlands" },
        { name: "Denali", height: 6168, place: "United States" },
        { name: "Popocatepetl", height: 5465, place: "Mexico" },
        { name: "Mont Blanc", height: 4808, place: "Italy/France" }
    ];
    if (parent) {
        const table = document.createElement("table");
        parent.appendChild(table);

        const headerRow = document.createElement("tr");
        const headerNames = Object.keys(MOUNTAINS[0]);
        for (const name of headerNames) {
            const head = document.createElement("th");
            const text = document.createTextNode(name);
            head.appendChild(text);
            headerRow.appendChild(head);
        }
        table.appendChild(headerRow);

        for (const el of MOUNTAINS) {
            const row = document.createElement("tr");
            for (const val of Object.values(el)) {
                const cell = document.createElement("td");
                const text = document.createTextNode(String(val));
                if (typeof val == "number") cell.style.textAlign = "right";
                cell.appendChild(text);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }
}
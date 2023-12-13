export const sortTable = () => {
  const table = document.querySelector("table"),
    tableHeaders = table.querySelectorAll("th"),
    tableBody = table.querySelector("tbody");

  const directions = Array.from(tableHeaders).map(() => "");

  const sort = (type, content) => {
    switch (type) {
      case "id":
        return parseFloat(content);
      case "create":
      case "update":
        return content.split(".").reverse().join("-");
      case "text":
      default:
        return content;
    }
  };

  const sortColumn = (index) => {
    const type = tableHeaders[index].getAttribute("data-type");
    const rows = tableBody.querySelectorAll("tr");
    const direction = directions[index] || "sortUp";
    const multiply = direction === "sortUp" ? 1 : -1;
    const newRow = Array.from(rows);

    newRow.sort((row1, row2) => {
      const cellA = row1.querySelectorAll("td")[index].textContent;
      const cellB = row2.querySelectorAll("td")[index].textContent;

      const a = sort(type, cellA);
      const b = sort(type, cellB);

      switch (true) {
        case a > b:
          return 1 * multiply;
        case a < b:
          return -1 * multiply;
        default:
          break;
        case a === b:
          return 0;
      }
    });

    [].forEach.call(rows, (row) => {
      tableBody.removeChild(row)
    })

    directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp'

    newRow.forEach(newRow => {
      tableBody.appendChild(newRow)
    })
  };

  [].forEach.call(tableHeaders, (header, index) => {
    header.addEventListener("click", () => {
      sortColumn(index);
    });
  });
};

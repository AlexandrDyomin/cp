let btn = document.querySelector('.sort-btn');
let table = document.querySelector('.pairs');
let flag = false;

btn.addEventListener('click', () => {
    let rows = table.querySelectorAll('tr[is=custom-PnL-row]');
    flag = !flag;
    if (flag) {
        let sortedRows = [...rows].sort((a, b) => +b.dataset.profit - +a.dataset.profit);
        rerenderRows(rows, sortedRows);
        btn.classList.remove('sort-btn_little');
        btn.classList.add('sort-btn_big');
        return;
    } 
    
    let sortedRows = [...rows].sort((a, b) => +a.dataset.profit - +b.dataset.profit);
    rerenderRows(rows, sortedRows);
    btn.classList.remove('sort-btn_big');
    btn.classList.add('sort-btn_little');
    return;

    function rerenderRows(rows, sortedRows) {
        rows.forEach((row, i) => {
            table.append(sortedRows[i]);
        });
    }
})
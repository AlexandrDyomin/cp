export function sortTable() {
    let flag = false;
    let btn = document.querySelector('.sort-btn');
    return function (table, rows, fn1, fn2) {
        flag = !flag;
        if (flag) {
            let sortedRows = [...rows].sort(fn1);
            rerenderRows(rows, sortedRows);
            btn.classList.remove('sort-btn_little');
            btn.classList.add('sort-btn_big');
            return;
        } 
        
        let sortedRows = [...rows].sort(fn2);
        rerenderRows(rows, sortedRows);
        btn.classList.remove('sort-btn_big');
        btn.classList.add('sort-btn_little');
        return;
    
        function rerenderRows(rows, sortedRows) {
            rows.forEach((row, i) => {
                table.append(sortedRows[i]);
            });
        }
    }

}
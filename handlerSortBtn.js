import { sortTable } from "./sort_btn/sort_btn";

let btn = document.querySelector('.sort-btn');
let table = document.querySelector('.pairs');
let sortFn = sortTable();

btn.addEventListener('click', () => {
    let rows = table.querySelectorAll('tr[is=custom-PnL-row]');
    sortFn(
        table,
        rows, 
        (a, b) => +b.dataset.profit - +a.dataset.profit,
        (a, b) => +a.dataset.profit - +b.dataset.profit
    );
});
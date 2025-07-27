import { CustomTR } from './coins_row.js';

export function updateRow(obj) {
    let row = document.querySelector(`.coins__record[data-id="${obj.id}"]`);
    row.dataset.name = obj.coin;
    row.dataset.amount = obj.amount;
}

export function renderRows(data) {
    let rows = [];
    data.forEach((item) => rows.push(new CustomTR(item)));
    let table = document.querySelector('.coins');
    table.append(...rows);
}
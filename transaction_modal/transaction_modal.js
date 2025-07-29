import './../modal/modal.js';
import { modal, modalFields, saveBtn } from './../modal/modal.js';
import { CustomBody } from '../transaction-row.js';
import { collectData } from '../modal/colletcData.js';
import { renderRows } from '../renderRows.js';


let amountField = modal.querySelector('input[name=amount]');
let priceField = modal.querySelector('input[name=price]');
let totalField = modal.querySelector('input[name=total]');
let table = document.querySelector('.transactions');

modal.addEventListener('input', calcTotal);
saveBtn.addEventListener('click', () => {
    let obj = collectData(modalFields, 'total');
    renderRows(table, [obj], CustomBody);
});

function calcTotal(e) {
    let { target } = e;
    if (!['amount', 'price'].includes(target.name)) return;
    let total = +amountField.value * +priceField.value;
    totalField.value = total;
}                











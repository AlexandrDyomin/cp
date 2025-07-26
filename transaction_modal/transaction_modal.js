import './../modal/modal.js';
import { modal } from './../modal/modal.js';

let amountField = modal.querySelector('input[name=amount]');
let priceField = modal.querySelector('input[name=price]');
let totalField = modal.querySelector('input[name=total]');
modal.addEventListener('input', calcTotal);

function calcTotal(e) {
    let { target } = e;
    if (!['amount', 'price'].includes(target.name)) return;
    let total = +amountField.value * +priceField.value;
    totalField.value = total;
}                
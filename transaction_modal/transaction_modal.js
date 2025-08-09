import './../modal/modal.js';
import { modal, modalFields, saveBtn } from './../modal/modal.js';
import { CustomBody } from '../transaction-row.js';
import { collectData } from '../modal/colletcData.js';
import { renderRows } from '../renderRows.js';
import { updateRow} from '../update_row.js';
import { connectDB } from '../db.js';
import { updateCoin } from '../updateCoin.js';


let amountField = modal.querySelector('input[name=amount]');
let priceField = modal.querySelector('input[name=price]');
let totalField = modal.querySelector('input[name=total]');
let table = document.querySelector('.transactions');

modal.addEventListener('input', calcTotal);
saveBtn.addEventListener('click', () => {
    let action = modal.dataset.action;
    let data = collectData(modalFields);
    saveData(action, data)();
    if (action === 'add') {
        connectDB((req) => {
            let coins = data.pair.split('/');
            if (data.transactionType === 'Покупка') {
                updateCoin(req, coins[0], +data.amount);
                updateCoin(req, coins[1], -1 * +data.total);
            }

             if (data.transactionType === 'Продажа') {
                updateCoin(req, coins[0], -1 * +data.amount);
                updateCoin(req, coins[1], +data.total);
             }
        });
    }
    modal.close();
});

function saveData(action, data) {
    let actions = {
        add: () => renderRows(table, [data], (item) => new CustomBody(item, true)),
        edit: () => updateRow(
            table.querySelector(`.transactions__record[data-id="${data.id}"]`),
            data
        )
    }
    return actions[action];
}

function calcTotal(e) {
    let { target } = e;
    if (!['amount', 'price'].includes(target.name)) return;
    let total = +amountField.value * +priceField.value;
    totalField.value = total;
}       












import './../modal/modal.js';
import { modal, modalFields, saveBtn } from './../modal/modal.js';
import { CustomBody } from '../transaction-row.js';
import { collectData } from '../modal/colletcData.js';
import { renderRows } from '../renderRows.js';
import { updateRow} from '../update_row.js';


let amountField = modal.querySelector('input[name=amount]');
let priceField = modal.querySelector('input[name=price]');
let totalField = modal.querySelector('input[name=total]');
let table = document.querySelector('.transactions');

modal.addEventListener('input', calcTotal);
saveBtn.addEventListener('click', () => {
    let action = modal.dataset.action;
    saveData(action)();

    modal.close();
});

function saveData(action) {
    let obj = collectData(modalFields);
    let actions = {
        add: () => renderRows(table, [obj], (item) => new CustomBody(item, true)),
        edit: () => updateRow(
            table.querySelector(`.transactions__record[data-id="${obj.id}"]`),
            obj
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












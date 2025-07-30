import './../modal/modal.js';
import { modal, modalFields, saveBtn } from './../modal/modal.js';
import { updateRow } from "../update_row.js";
import { renderRows } from "../renderRows.js";
import { collectData } from "../modal/colletcData.js";
import { CustomTR } from "../coins_row.js";

let table = document.querySelector('.coins');

saveBtn.addEventListener('click', () => {
    let action = modal.dataset.action;
    saveData(action)();
    modal.close();
});

function saveData(action) {
    let obj = collectData(modalFields);
    let actions = {
        add: () => renderRows(table, [obj], (item) => new CustomTR(item, true)),
        edit: () => updateRow(
            table.querySelector(`.coins__record[data-id="${obj.id}"]`),
            obj
        )
    }
    return actions[action];
}


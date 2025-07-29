import { connectDB, startTransaction } from "../db.js";
import './../modal/modal.js';
import { modal, modalFields, saveBtn } from './../modal/modal.js';
import { updateRow } from "../coins_table.js";
import { collectData } from "../modal/colletcData.js";
import { renderRows } from "../renderRows.js";
import { CustomTR } from "../coins_row.js";


saveBtn.addEventListener('click', () => {
    let action = modal.dataset.action;
    connectDB(saveData(action));
});
let table = document.querySelector('.coins');

function saveData(action) {
    return (e) => {
        let obj = collectData(modalFields);
        let wallet = startTransaction(e, 'wallet', 'readwrite');
        let actions = {
            add: () => {
                let coinIndex = wallet.index('coinIdx');
                let coin = coinIndex.get(obj.coin);
                coin.onsuccess = (e) => {
                    let record = e.target.result;
                    if (record) {
                        obj.id = record.id;
                        obj.amount = record.amount + obj.amount;
                        updateRow(obj);
                        modal.close();
                    } else {
                        let countRequest =  wallet.count();
                        countRequest.onsuccess = (e) => {
                            obj.id = e.target.result + 1;
                            renderRows(table, [obj], CustomTR);
                            updateRow(obj);
                            modal.close();
                        };
                    }
                };
            },
            edit: () => {
                updateRow(obj);
                modal.close();
            }
        }
        actions[action]();
    }
}


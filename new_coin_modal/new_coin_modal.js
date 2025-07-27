import { connectDB, startTransaction } from "../db.js";
import './../modal/modal.js';
import { modal, modalFields, saveBtn } from './../modal/modal.js';
import { updateRow, renderRows } from "../coins_table.js";

saveBtn.addEventListener('click', () => {
    let action = modal.dataset.action;
    connectDB(saveData(action));
});

function prepareData() {
    return [ ...modalFields]
        .reduce((acc, el) => {
            let value = (el.type === 'number') ? +el.value : el.value.toLowerCase().trim();
            value && (acc[el.name] = value);
            return acc;
        }, {});
}

function saveData(action) {
    return (e) => {
        let obj = prepareData();
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
                            renderRows([obj]);
                            updateRow(obj);
                            modal.close();
                        }
                    }
                }
            },
            edit: () => {
                updateRow(obj);
                modal.close();
            }
        }
        actions[action]();
    }
}


export function updateRow(obj) {
    let row = document.querySelector(`.coins__record[data-id="${obj.id}"]`);
    row.dataset.name = obj.coin;
    row.dataset.amount = obj.amount;
    row.dataset.timeUpdate = Date.now();
}

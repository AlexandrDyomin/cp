export function updateRow(target, { coin, amount}) {
    target.dataset.name = coin;
    target.dataset.amount = amount;
    target.dataset.timeUpdate = Date.now();
}

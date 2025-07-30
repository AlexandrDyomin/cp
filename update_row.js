export function updateRow(target, obj) {
    for (let [key, value] of Object.entries(obj)) {
        target.dataset[key] = value;
    }
    target.dataset.timeUpdate = Date.now();
}
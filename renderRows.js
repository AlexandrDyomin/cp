export function renderRows(target, data, fn) {
    let rows = [];
    data.forEach((item) => rows.push(fn(item)));
    target.append(...rows);
}
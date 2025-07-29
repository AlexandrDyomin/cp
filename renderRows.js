export function renderRows(target, data, fn) {
    let rows = [];
    data.forEach((item) => rows.push(new fn(item, true)));
    target.append(...rows);
}
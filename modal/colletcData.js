export function collectData(fields, ...excludeNames) {
    return [ ...fields]
        .reduce((acc, el) => {
            if (excludeNames.includes(el.name)) return acc;
            let value = (el.type === 'number') ? +el.value : el.value.trim();
            if (el.id === 'pair') {
                value = el.value.toLowerCase();
            }
            value && (acc[el.name] = value);
            return acc;
        }, {});
}
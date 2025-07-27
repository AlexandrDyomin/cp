export function makeFuncFillModal({
    modalClassName,
    rowTableClassName,
    cellsClassNames
}) {
    return (e) => {
        let editBtn = e.target;
        if (!e.target.closest('.edit-btn')) return;
        
        let record = editBtn.closest('.' + rowTableClassName);
        let id = record.dataset.id;

        let cells = [
            document.createTextNode(id),
            ...cellsClassNames.map((className) => record.querySelector(`.${ className }`))
        ];

        let modal = document.querySelector('.' + modalClassName);
        let fieldsModal = modal.querySelectorAll('*[name]');

        fieldsModal.forEach((field, i) => {
            if (field.type === 'date') {
                field.value = cells[i].dateTime;
                return;
            }
            if (['price', 'total'].includes(field.name)) {
                field.value = cells[i].textContent.slice(1);
                return;
            }
            field.value = cells[i].textContent.replace(',', '.');
        });
    }
}

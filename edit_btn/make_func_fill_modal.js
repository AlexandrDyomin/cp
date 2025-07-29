export function makeFuncFillModal({
    modalClassName,
    rowTableClassName,
    cellsClassNames
}) {
    return (e) => {
        let editBtn = e.target;
        if (!editBtn.closest('.edit-btn')) return;
        
        let record = editBtn.closest('.' + rowTableClassName);
        let id = record.dataset.id;

        let cells = [
            document.createTextNode(id),
            ...cellsClassNames.map((className) => record.querySelector(`.${ className }`))
        ];

        let modal = document.querySelector('.' + modalClassName);
        let fieldsModal = modal.querySelectorAll('*[name]');

        fieldsModal.forEach((field, i) => {
            if (field.type === 'datetime-local') {
                field.value = cells[i].dateTime;
                return;
            }
            if (field.type === 'number') {
                field.value = cells[i].textContent.replace(',', '.');
                return;
            }
            field.value = cells[i].textContent;
        });
    }
}

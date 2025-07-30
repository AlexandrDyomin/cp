let table = document.querySelector('.coins') || document.querySelector('.transactions');
table.addEventListener('click', deleteRow);

function deleteRow(e) {
    if (!e.target.closest('.delete-btn')) return;
    let record = e.target.closest('.coins__record') || e.target.closest('.transactions__record');
    record.remove();
}
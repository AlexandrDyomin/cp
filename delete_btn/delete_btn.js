let table = document.querySelector('.coins');
table.addEventListener('click', deleteRow);

function deleteRow(e) {
    if (!e.target.closest('.delete-btn')) return;
    e.target.closest('.coins__record').remove();
}
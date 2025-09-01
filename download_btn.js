import { connectDB, readAllStores } from './db.js';
import { uploadData, clearStore } from './db.js';

let downloadBtn = document.querySelector('.download');

connectDB(async (req) => {
    URL.revokeObjectURL(downloadBtn.href);
    downloadBtn.href = URL.createObjectURL(await prepareData(req));
    downloadBtn.addEventListener('click', saveDb);

    function saveDb(e) {
        connectDB(async (req) => {
            downloadBtn.href = URL.createObjectURL(await prepareData(req));
        });
    }
});

async function prepareData(req) {
    let result = await readAllStores(req);
    result = JSON.stringify(result);
    return new Blob([result], { type: 'application/json' });
}

let uploadBtn = document.querySelector('.upload');
uploadBtn.addEventListener('click', () => uploadBtn.children[0].click());
uploadBtn.addEventListener('change', handleClickUploadBtn);
function handleClickUploadBtn(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => { 
        let data = JSON.parse(reader.result); 
        connectDB((req) => {
            clearStore(req, 'wallet', 'transactions');
            uploadData(req, data);
            document.location.reload();
        });
    }
    reader.onerror = () => console.log(reader.error);
}
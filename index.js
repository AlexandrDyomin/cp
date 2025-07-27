import './navigation/navigation.js';
import './deposit/deposit.js';
import './edit_btn/handleClickEditBalanceBtn.js';
import './new_coin_modal/new_coin_modal.js';
import './delete_btn/delete_btn.js';
import { connectDB, makeReadAllRecords } from './db.js';
import { renderRows } from './coins_table.js';

connectDB(makeReadAllRecords('wallet', renderRows));
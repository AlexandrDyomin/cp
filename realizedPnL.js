import './navigation/navigation.js';
import './download_btn.js';
import { getTradingStatistics } from './getTradingStatistics.js';
import { CustomPnLRow } from './Pairs_row.js';

let table = document.querySelector('.pairs');

(async () => {
    // получим анализ торговли
    let data = await getTradingStatistics();
    // отобразим результат
    for (let pair of data) {
        pair
        .then((data) => {
            if (!data.realized.invested) {
                return
            }
            table.append( new CustomPnLRow({ pair: data.pair, ...data.realized }));
        })
    }
})();




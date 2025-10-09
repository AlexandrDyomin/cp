import './navigation/navigation.js';
import './download_btn.js';
import { getTradingStatistics } from './getTradingStatistics.js';
import { renderRows } from './renderRows.js';
import { CustomPnLRow } from './Pairs_row.js';

let table = document.querySelector('.pairs');

(async () => {
    // получим анализ торговли
    let data = await getTradingStatistics();
    
    Promise.all(data)
        .then((statistics) => {
            // отсортируем statistics по убыванию прибыли
            let sortedStatistics = [...statistics].sort((a, b) => 
                b.realized.invested - a.realized.invested
            )
            // отобразим результат
            renderRows(
                table, 
                sortedStatistics.filter((item) => item.realized.invested), 
                (item) => new CustomPnLRow({ pair: item.pair, ...item.realized })
            );
        })
})();




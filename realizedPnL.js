import './navigation/navigation.js';
import './download_btn.js';

import { getTradingStatistics } from './getTradingStatistics.js';

(async () => {
    let statistics = await getTradingStatistics();
    console.log(statistics)
   
    // отсортируем results по убыванию прибыли
    
    // отобразим результат
})()




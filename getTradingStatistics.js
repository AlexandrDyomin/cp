import { connectDB, makeReadAllRecords } from './db.js';
import { calculateProfit } from './calculateProfit.js';
import { getPrice } from "./getPriceCoin.js";

export async function getTradingStatistics () {
    // получим список транзакций
    let transactions = await getTransactions();
    
    // для каждой монеты создадим список покупок и список продаж
    let pairs = splitIntoBuysSells(transactions);
    
    // вычислим прибыль/убыток по монете и добавим его в общий список results
    let result = [];
    for (let pairInfo of pairs) {
        result.push(new Promise((resolve) => {
            let currentPrice = getPrice(pairInfo.pair.split('/')[0]);
            currentPrice.then((price) => {
                let item = calculateProfit(pairInfo.buys, pairInfo.sells, price);
                item.pair = pairInfo.pair;
                resolve(item);
            })
        }));
    }
    
    return result;
    
    function getTransactions() {
        return new Promise((resolve) => {
            connectDB(makeReadAllRecords('transactions', (data) => resolve(data)));        
        });
    }
    
    function splitIntoBuysSells(transactions) {
        let result = [];
        let pairNames = getPairNames(transactions);
    
        for (let pair of pairNames) {
            let buys = transactions.filter((transaction) => {
                return transaction.transactionType === 'Покупка' && transaction.pair === pair;
            });
    
            let sells = transactions.filter((transaction) => {
                    return transaction.transactionType === 'Продажа' && transaction.pair === pair
            });
    
            let pairInfo = {
                pair,
                buys: buys.sort((a, b) => 
                    new Date(a.date) - new Date(b.date)
                ),
                sells: sells.sort((a, b) => 
                    new Date(a.date) - new Date(b.date)
                )
            };
    
            result.push(pairInfo);
        }
        
        return result;
    
        function getPairNames(transactions) {
            let pairNames = new Set(transactions.map(
                (transactions) => transactions.pair)
            );
            return [...pairNames];
        }
    }
}
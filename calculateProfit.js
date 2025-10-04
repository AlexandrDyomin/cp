export function calculateProfit(buys, sells, currentPrice) {
    // Копируем массив покупок чтобы не менять оригинал
    const remainingBuys = buys.map(buy => ({...buy, remaining: buy.amount}));
    
    // Расчет РЕАЛИЗОВАННОЙ прибыли (FIFO)
    let realizedProfit = 0;
    let investedInSales = 0;
    
    for (const sell of sells) {
        let sellAmount = sell.amount;
        
        for (const buy of remainingBuys) {
            if (sellAmount <= 0) break;
            if (buy.remaining <= 0) continue;
            
            const amountToSell = Math.min(sellAmount, buy.remaining);
            const profit = amountToSell * (sell.price - buy.price);
            
            realizedProfit += profit;
            investedInSales += amountToSell * buy.price;
            
            sellAmount -= amountToSell;
            buy.remaining -= amountToSell;
        }
    }
    
    // Расчет НЕРЕАЛИЗОВАННОЙ прибыли
    let unrealizedProfit = 0;
    let remainingInvested = 0;
    
    for (const buy of remainingBuys) {
        const currentValue = buy.remaining * currentPrice;
        const invested = buy.remaining * buy.price;
        unrealizedProfit += currentValue - invested;
        remainingInvested += invested;
    }
    
    // Проценты
    const realizedPercent = investedInSales > 0 ? (realizedProfit / investedInSales) * 100 : 0;
    const unrealizedPercent = remainingInvested > 0 ? (unrealizedProfit / remainingInvested) * 100 : 0;
    
    return {
        realized: {
            profit: realizedProfit,
            percent: realizedPercent,
            invested: investedInSales
        },
        unrealized: {
            profit: unrealizedProfit,
            percent: unrealizedPercent,
            invested: remainingInvested
        },
        total: {
            profit: realizedProfit + unrealizedProfit,
            invested: investedInSales + remainingInvested
        }
    };
}






// Мои покупки
const buys = [
    { amount: 0.5, price: 20000 },
    { amount: 0.3, price: 22000 },
    { amount: 0.2, price: 25000 }
];

// Мои продажи
const sells = [
    { amount: 0.7, price: 27000 }
];

// Текущая цена
const currentPrice = 28000;

// Расчет
// const result = calculateProfit(buys, sells, currentPrice);

// // Вывод результатов
// console.log('💰 РЕАЛИЗОВАННАЯ ПРИБЫЛЬ:');
// console.log(`Прибыль: $${result.realized.profit.toFixed(2)}`);
// console.log(`Доходность: ${result.realized.percent.toFixed(2)}%`);
// console.log(`Инвестировано: $${result.realized.invested.toFixed(2)}`);

// console.log('\n📈 НЕРЕАЛИЗОВАННАЯ ПРИБЫЛЬ:');
// console.log(`Прибыль: $${result.unrealized.profit.toFixed(2)}`);
// console.log(`Доходность: ${result.unrealized.percent.toFixed(2)}%`);
// console.log(`Инвестировано: $${result.unrealized.invested.toFixed(2)}`);

// console.log('\n💵 ОБЩАЯ СТАТИСТИКА:');
// console.log(`Общая прибыль: $${result.total.profit.toFixed(2)}`);
// console.log(`Всего инвестировано: $${result.total.invested.toFixed(2)}`);
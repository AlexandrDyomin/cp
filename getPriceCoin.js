export function getPrice(coin) {
        if (coin === 'usdt') {
            return Promise.resolve(1);
        }
        const URL_BARS_INFO = 'https://api.binance.com/api/v1/klines';
        return fetch(`${URL_BARS_INFO}?symbol=${coin?.toUpperCase() }USDT&interval=1d&limit=1`)
            .then((response) => response.json())
            .then((data) => {
                return +parseFloat(data[0][4]).toFixed(2);
            });
    }
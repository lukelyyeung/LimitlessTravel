const axios = require('axios');

const now = new Date();
let date = now;

date.setDate(date.getDate() + 30);

let url = getUrl(date, 'HKG', 2, 7, 10000, 'HKD', 200);
console.log(url)


function formattedDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
}

function getUrl(date, flyFrom, daysInDestinationFrom, daysInDestinationTo, price_to, curr, limit) {
    let dateFrom = formattedDate(date).replace(/\//g, '%2F');
    let dateTo = formattedDate(date).replace(/\//g, '%2F');

    return `https://api.skypicker.com/flights?flyFrom=${flyFrom}&dateFrom=${dateFrom}&dateTo=${dateTo}&daysInDestinationFrom=${daysInDestinationFrom}&daysInDestinationTo=${daysInDestinationTo}&partner=picky&partner_market=us&curr=${curr}&price_to=${price_to}&directFlights=1&limit=${limit}`;
}
const numberToCurrency = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'}).format(number)
};

const currencyToNumber = (value) => {
    return Number(value.replace(/[^0-9.-]+/g,""))
}

module.exports = {numberToCurrency, currencyToNumber}
import numeral from "numeral";
numeral.defaultFormat("$0,0.00");
numeral.language('en-GB', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    currency: {
        symbol: '£'
    }
});
numeral.language('en-GB');

export default numeral;
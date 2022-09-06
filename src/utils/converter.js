let words = [
    [
    '', 'bir', 'iki', 'üç', 'dört', 'bäş', 'alty',
    'ýedi', 'sekiz', 'dokuz', 
    ],
    [
    '', 'on', 'ýigrimi', 'otuz', 'kyrk', 'elli',
    'altmyş', 'ýetmiş', 'segsen', 'dogsan'
    ],
    [
    '', 'bir ýüz', 'iki ýüz', 'üç ýüz', 'dört ýüz', 'bäş ýüz',
    'alty ýüz', 'ýedi ýüz', 'sekiz ýüz', 'dokuz ýüz'
    ]
];

let toFloat = function(number) {
    return parseFloat(number);
};

let parseNumber = function(number, count) {
    let first;
    let second;
    let numeral = '';

    if (number.length === 3) {
        first = number.substr(0, 1);
        number = number.substr(1, 3);
        numeral = '' + words[2][first] + ' ';
    }

    if (+number < 10) {
        numeral = numeral + words[0][toFloat(number)] + ' ';
    } else {
        first = number.substr(0, 1);
        second = number.substr(1, 2);
        numeral = numeral + words[1][first] + ' ' + words[0][second] + ' ';
    }

    if (count === 1) {
        if (numeral !== '  ') {
            numeral = numeral + 'müň '
        }
    } else if (count === 2) {
        if (numeral !== '  ') {
            numeral = numeral + 'million '
        }
    } else if (count === 3) {
        numeral = numeral + 'milliard '
    }else if (count === 4) {
        numeral = numeral + 'trillion '
    }

    return numeral;
};


let converter = (number) => {
    let numeral = '';
    let length = number.length - 1;
    let parts = '';
    let count = 0;
    let digit;

    while (length >= 0) {
        digit = number.substr(length, 1);
        parts = digit + parts;

        if ((parts.length === 3 || length === 0) && !isNaN(toFloat(parts))) {
            numeral = parseNumber(parts, count) + numeral;
            parts = '';
            count++;
        }

        length--;
    }

    //numeral = numeral.replace(/\s+/g, ' ');
    return numeral;
}


function Main(number) {
    if (!number) {
        return false;
    }

    let type = typeof number;
        if (type !== 'number' && type !== 'string') {
        return false;
    }

    if (type === 'string') {
        number = toFloat(number.replace(',', '.'));

        if (isNaN(number)) {
            return false;
        }
    }

    if (number <= 0) {
        return false;
    }

    let splt;
    let decimals;

    number = number.toFixed(2);
    if (number.indexOf('.') !== -1) {
        splt = number.split('.');
        number = splt[0];
        decimals = splt[1];
    }
    let manat = converter(number);
    let tenne =  '00 '
    if (decimals && +decimals !== 0) {
        tenne = converter(decimals);
    }
    return {manat: manat + "manat", tenne: tenne + "teňňe"}
};


module.exports = Main;
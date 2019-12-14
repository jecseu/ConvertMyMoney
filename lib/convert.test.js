const convert = require('./convert')

test('convert cotacao 4 e valor 5', () =>{
    expect(convert.convert(4,5)).toBe(20)
})

test('toMoney convert to money', () => {
    expect(convert.toMoney(30)).toBe('30.00')
})
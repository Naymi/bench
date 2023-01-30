import { basename } from 'path'

const b = require('benny')

let testedString: any = 'Hello World'.repeat(1e6) + '!'
let testedArray: any = [...'Hello World'.repeat(1e6), '!']

let file = basename(__filename, '.ts')
b.suite(
    'Has element',

    b.add('indexOf string', () => {
        testedString.indexOf('!') > -1
    }),


    b.add('indexOf testedArray', () => {
        testedArray.indexOf('!') > -1
    }),


    b.add('includes string', () => {
        testedString.includes('!')
    }),

    b.add('includes testedArray', () => {
        testedArray.includes('!')
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: file, version: '1.0.0' }),
    b.save({ file: file, format: 'chart.html' }),
)

import b from 'benny'
import { basename } from 'path'

const isSimple = (value: number) => {
    for (let i = 2; i < value; i++) {
        if (value % i === 0) {
            return false
        }
    }
    return true
}
const totalizer = (acc: number, item: number): number => acc + item

function* getSimpleDelimeters(value: number) {
    for (let i = 0; i < value; i++) {
        const list = []
        for (let j = 0; j < i; j++) {
            if (i % j === 0) {
                list.push(j)
            }
        }
        if (list.reduce(totalizer, 0) === i) {
            yield i
        }
    }
}


let testName = basename(__filename)
let file = testName
b.suite(
    testName,

    b.add('100', () => {
        [...getSimpleDelimeters(100)].length
    }),
    b.add('1000', () => {
        [...getSimpleDelimeters(1e3)].length
    }),
    b.add('10000', () => {
        [...getSimpleDelimeters(10e3)].length
    }),

    // b.add('100000', () => {
    //     [...getSimpleDelimeters(100e3)].length
    // }),


    b.cycle(),
    b.complete(),
    b.save({ file: file, version: '1.0.0' }),
    b.save({ file: file, format: 'chart.html' }),
)

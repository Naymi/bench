import b from 'benny'
import { basename } from 'path'

let file = basename(__filename)

let shuffle = () => Math.random() - Math.random()
const ids = Array.from({
    length: 100e3,
}, (_, i) => i).sort(shuffle)

const dataList100 = Array.from({ length: 100 }, (_, id) => ({ id })).sort(shuffle)
const dataList100e3 = Array.from({ length: 100e3 }, (_, id) => ({ id })).sort(shuffle)

b.suite(
    file,

    b.add('map 100', () => {
        const map = new Map()
        for (const item of dataList100) {
            map.set(item.id, item)
        }
        return ids.map((i) => map.get(i))
    }),
    b.add('array map 100', () => {
        return ids.map((item) => {
            return dataList100.find((found) => found.id === item)
        })
    }),

    b.add('map 100e3', () => {
        const map = new Map()
        for (const item of dataList100e3) {
            map.set(item.id, item)
        }
        return ids.map((i) => map.get(i))
    }),
    b.add('array map 100e3', () => {
        return ids.map((item) => {
            return dataList100e3.find((found) => found.id === item)
        })
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: file, version: '1.0.0' }),
    b.save({ file: file, format: 'chart.html' }),
)

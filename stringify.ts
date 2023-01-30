import { Static, Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import b from 'benny'
import fastJson from 'fast-json-stringify'
import { basename } from 'path'
import TSON from 'typescript-json'

let file = basename(__filename)

const schema = Type.Object({
    a: Type.String(),
    b: Type.String(),
    c: Type.Object({
        d: Type.Tuple([Type.Number(), Type.String()])
    })
})

const object = Value.Create(schema)

const stringify = fastJson(schema)
console.log('object', object)
type V = {
    a: string,
    b: string,
    c: {
        d: [number, string]
    }
}
console.log('TSON.is<V>({ ...object, b: 1 })', TSON.is<V>({ ...object, b: 1 }))
const result = JSON.stringify(object)
b.suite(
    file,

    b.add('JSON.stringify', () => {
        JSON.stringify(object)
    }),
    b.add('TSON', () => {
        TSON.stringify<V>(object)
    }),
    b.add('fast-json-stringify', () => {
        stringify(object)
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: file, version: '1.0.0' }),
    b.save({ file: file, format: 'chart.html' }),
)

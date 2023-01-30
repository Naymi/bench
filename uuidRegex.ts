import b from 'benny'
import { basename } from 'path';
import { v4 } from 'uuid';

const uuidRegex = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
const typeBoxRegex = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const value = v4()
let file = basename(__filename)
b.suite(
    file,

    b.add('uuidRegex', () => {
        uuidRegex.test(value)
    }),
    b.add('typeBoxRegex', () => {
        typeBoxRegex.test(value)
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: file, version: '1.0.0' }),
    b.save({ file: file, format: 'chart.html' }),
)

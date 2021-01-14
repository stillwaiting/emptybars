import {secsToString, stringToSecs} from './utils'

test('stringToSecs converts string to seconds (float)', () => {
    expect(stringToSecs('02:01.7')).toBe(121.7);
});

test('secToString converts seconds to string', () => {
    expect(secsToString(121.7)).toBe('02:01.7');
});
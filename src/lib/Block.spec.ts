// import {Block} from './Block.js';

// test('defines onClick property name to be an event listener prop', () => {
//     expect(Block._isEven).toBe(3);
// });
function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
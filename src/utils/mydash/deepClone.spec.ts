import { cloneDeep } from './deepClone';

const obj1 = { a: { b: 1 } };
const objWithArray = { a: [{ b: 1 }] };

test('cloning an object not to be equal its copy', () => {
    expect(cloneDeep(obj1)).not.toBe(obj1);
});

test('cloning an object with array not to be equal its copy', () => {
    expect(cloneDeep(objWithArray)).not.toBe(objWithArray);
});

test('cloning an object preservers its initial structure', () => {
    expect(cloneDeep(objWithArray)).toEqual(objWithArray);
});
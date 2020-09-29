import { cloneDeep } from './deepClone';

const obj1 = { a: { b: 1 } };
const objWithArray = { a: [{ b: 1 }] };

test('cloning an object not to be equal its copy', () => {
    expect(cloneDeep(obj1)).not.toBe(obj1);
    expect(cloneDeep(objWithArray)).not.toBe(objWithArray);
});
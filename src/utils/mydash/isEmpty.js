/*
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ 'a': 1 }); // => false
isEmpty('123'); // => false
isEmpty(''); // => true
isEmpty(0); // => true
*/

function isEmpty(value) {
    if (typeof value === 'object') {
        if (value === null) {
            return true;
        }

        if (Array.isArray(value)) {
            return !value.length;
        }

        if (value instanceof Set || value instanceof Map) {
            return !value.size;
        }

        return !Object.keys(value).length;
    } if (typeof value === 'string') {
        return !value.length;
    }

    return true;
}

export default isEmpty;

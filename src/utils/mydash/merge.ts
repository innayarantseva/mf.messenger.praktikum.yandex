// type Indexed<T = unknown> = {
//     [key in string]: T;
// };

export function merge(lhs, rhs) {
    // Код здесь
    let result = { ...lhs };

    Object.entries(rhs).forEach(([key, value]) => {
        if (typeof rhs[key] === 'object' && key in lhs) {
            result[key] = merge(lhs[key], value);
        } else {
            result[key] = value;
        }
    });

    return result;
}

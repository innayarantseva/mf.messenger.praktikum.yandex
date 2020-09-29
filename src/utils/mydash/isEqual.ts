export function isEqual(a: object, b: object): boolean {
    // Код здесь
    if ((typeof a !== 'object' || !a) || (typeof b !== 'object' || !b)) {
        return false;
    }

    return Object.keys(a).reduce((acc, key) => {
        if (
            typeof a[key] === 'object' &&
            a[key] !== null &&
            typeof b[key] === 'object' &&
            b[key] !== null
        ) {
            return acc && isEqual(a[key], b[key]);
        }

        return acc && a[key] === b[key];
    }, true);
}

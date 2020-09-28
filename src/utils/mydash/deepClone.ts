const isObject = (value: unknown) => {
    return typeof value === 'object' && value !== null;
}

export function cloneDeep<T extends object = object>(obj: T) {
    if (!isObject(obj)) {
        return;
    }

    if (Array.isArray(obj)) {
        return obj.reduce((acc, item) => {
            acc.push(isObject(item) ? cloneDeep(item) : item);
            return acc;
        }, []);
    } else {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            acc[key] = isObject(value) ? cloneDeep(value) : value;
            return acc;
        }, {});
    }
}
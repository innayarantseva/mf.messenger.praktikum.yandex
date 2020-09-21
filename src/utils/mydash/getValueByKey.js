function get(obj, path, defaultValue) {
    const keys = path.split('.');
    let value = obj;

    for (let key of keys) {
        value = obj[key];

        if (value === undefined) {
            return defaultValue;
        }
    }

    return value || defaultValue;
}

export default get;
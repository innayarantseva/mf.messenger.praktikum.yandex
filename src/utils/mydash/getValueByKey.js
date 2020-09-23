function get(obj, path, defaultValue) {
    const keys = path.split('.');
    let value = obj;

    for (let key of keys) {
        value = value[key]; // 🤦🏼‍♀️

        if (value === undefined) {
            return defaultValue;
        }
    }

    // иначе переписывает falsy-значения значением undefined
    return value === undefined ? defaultValue : value;
}

export default get;

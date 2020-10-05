export function get<T>(obj: T, path: string, defaultValue?: unknown): T[keyof T] | unknown {
    const keys = path.split('.');
    let value = obj;

    for (const key of keys) {
        value = value[key];

        if (value === undefined) {
            return defaultValue;
        }
    }

    return value === undefined ? defaultValue : value;
}

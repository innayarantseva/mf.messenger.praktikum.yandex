function first(list) {
    if (Array.isArray(list)) {
        return list[0] || undefined;
    }
    return undefined;
}

export default first;

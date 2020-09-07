function first(list) {
	if (Array.isArray(list)) {
      return list[0] || undefined;
    } else {
      return undefined;
    }
}

export default first;
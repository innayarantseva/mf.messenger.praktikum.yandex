function first(list) {
	if (Array.isArray(list)) {
      if (list[0]) {
        return list[0];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
}

export default first;
function last(list) {
	if (Array.isArray(list)) {
      if (list[list.length - 1]) {
        return list[list.length - 1];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
}

export default last;
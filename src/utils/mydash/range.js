// console.log(range(4)); // => [0, 1, 2, 3]
// console.log(range(-4)); // => [0, -1, -2, -3]
// console.log(range(1, 5)); // => [1, 2, 3, 4]
// console.log(range(0, 20, 5)); // => [0, 5, 10, 15]
// console.log(range(0, -4, -1)); // => [0, -1, -2, -3]
// console.log(range(1, 4, 0)); // => [1, 1, 1]
// console.log(range(0)); // => []

function range(start, end, step, isRight = false) {
    if (end === undefined) {
      end = start;
      start = 0;
    }

    if (step === undefined) {
        step = start < end ? 1 : -1;
    }

    let resultLength = Math.ceil((end - start) / (step || 1));
    const result = Array(resultLength);

    let startIndex = 0;
    while (resultLength--) {
      result[isRight ? resultLength : startIndex++] = start;
      start += step;
    }

    return result;
}

export default range;
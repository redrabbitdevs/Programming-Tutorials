// @ts-check

/**
 * @param {number[]} numbers
 * @returns {number}
 */
function average(numbers) {
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

console.log(average([2, 4, 9]));

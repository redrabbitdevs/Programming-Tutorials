const READ = 1;
const WRITE = 2;
const EXEC = 4;

let mode = READ | WRITE;
console.log(mode, (mode & WRITE) !== 0, (mode & EXEC) !== 0);
mode ^= READ;
console.log(mode);

console.log(3.7 | 0, ~~-3.7, -1 >>> 0, 1 << 3, -16 >> 2, 2 ** 10);

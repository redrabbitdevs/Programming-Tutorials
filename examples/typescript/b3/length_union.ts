function isEmpty(value: string | unknown[]): boolean {
  return value.length === 0;
}

console.log(isEmpty(""), isEmpty([1, 2]));

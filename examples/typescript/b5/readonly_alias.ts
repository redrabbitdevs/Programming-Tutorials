const frozen: { readonly id: number } = { id: 1 };
const loose: { id: number } = frozen;

loose.id = 2;
console.log(frozen.id);

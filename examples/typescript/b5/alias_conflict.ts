type Base = { id: string };
type Derived = Base & { id: number };

const item: Derived = { id: 1 };
console.log(item);

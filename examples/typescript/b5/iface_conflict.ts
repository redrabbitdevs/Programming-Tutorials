interface Base {
  id: string;
}

interface Derived extends Base {
  id: number;
}

const item: Derived = { id: 1 };
console.log(item);

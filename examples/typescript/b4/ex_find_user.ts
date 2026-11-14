type User = { id: number; name: string };

const users: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];

function nameOf(id: number): string {
  return users.find((user) => user.id === id)?.name ?? "unknown";
}

console.log(nameOf(2));
console.log(nameOf(9));

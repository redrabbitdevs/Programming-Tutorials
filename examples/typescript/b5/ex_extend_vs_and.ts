interface Named {
  name: string;
}

interface Aged extends Named {
  age: number;
}

type Contact = Named & { email: string };

const person: Aged = { name: "Ada", age: 36 };
const contact: Contact = { name: "Ada", email: "ada@example.org" };

console.log(person.age, contact.email);

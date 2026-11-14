const member: { readonly id: number; email: string } = {
  id: 1,
  email: "ada@example.com",
};

member.email = "ada@lovelace.dev";
member.id = 2;
console.log(member);

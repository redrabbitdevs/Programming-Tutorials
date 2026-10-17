const users = new Map([[1, "Ada"], [2, "Alan"]]);

export async function findUser(id) {
  await new Promise((resolve) => setTimeout(resolve, 5));
  if (!users.has(id)) throw new Error(`no user ${id}`);
  return { id, name: users.get(id) };
}

import { makeUser, type Role, type User } from "./index.ts";

const role: Role = "admin";
const user: User = makeUser("Ada", role);
console.log(user);

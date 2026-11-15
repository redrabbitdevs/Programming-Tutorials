export interface User {
  name: string;
  role: Role;
}

export type Role = "admin" | "guest";

export function makeUser(name: string, role: Role = "guest"): User {
  return { name, role };
}

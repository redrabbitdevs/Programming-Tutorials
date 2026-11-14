interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}

type Role = "admin" | "guest";
type Callback = (user: User) => void;
type Coordinates = [number, number];

const admin: Admin = { id: 1, name: "Ada", permissions: ["all"] };
const role: Role = "admin";
const show: Callback = (user) => console.log(user.name);
const home: Coordinates = [51.5, -0.12];

show(admin);
console.log(role, admin.permissions, home);

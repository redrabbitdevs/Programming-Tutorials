const user = { name: "Ada", admin: false };

console.log(user.name && user.name.toUpperCase());
console.log("" && "never reached");
console.log(user.nickname || user.name);
console.log(0 || "" || null);
console.log(1 && 2 && 3);

user.admin && console.log("admin tools");
user.admin || console.log("not an admin");

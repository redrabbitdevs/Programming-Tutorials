const team = Object.freeze({ name: "core", members: ["Ada"] });
team.members.push("Grace");
console.log(team.members.length, Object.isFrozen(team));

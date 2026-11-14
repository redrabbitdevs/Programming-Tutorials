interface Team {
  readonly name: string;
  readonly members: readonly string[];
}

const team: Team = { name: "Core", members: ["Ada"] };
team.members.push("Grace");

console.log(team);

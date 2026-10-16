const teams = [["Ada", "Grace"], ["Linus"], []];
console.log(teams.flat().map((name) => name.toUpperCase()));
console.log(teams.flatMap((team) => team.map((name) => name.toUpperCase())));

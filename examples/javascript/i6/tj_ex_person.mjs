// @ts-check

/** @typedef {{ name: string, age?: number }} Person */

/**
 * @param {Person} person
 * @returns {string}
 */
function greet(person) {
  const age = person.age === undefined ? "unknown age" : `${person.age} years`;
  return `${person.name}, ${age}`;
}

console.log(greet({ name: "Ada" }));
console.log(greet({ name: "Alan", age: 41 }));

type Fish = { swim: () => string };
type Bird = { fly: () => string };

function move(pet: Fish | Bird): string {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}

console.log(move({ swim: () => "splash" }));
console.log(move({ fly: () => "flap" }));

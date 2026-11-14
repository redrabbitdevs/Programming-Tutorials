type User = {
  name: string;
  address?: { city: string; zip?: string };
};

const ada: User = { name: "Ada", address: { city: "London" } };
const bob: User = { name: "Bob" };

const city: string | undefined = bob.address?.city;
console.log(ada.address?.city, city);
console.log(ada.address?.zip?.length);

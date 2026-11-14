type Payment =
  | { method: "card"; last4: string }
  | { method: "cash" }
  | { method: "transfer"; iban: string };

function describe(payment: Payment): string {
  switch (payment.method) {
    case "card":
      return `card ending ${payment.last4}`;
    case "cash":
      return "cash";
    case "transfer":
      return `transfer to ${payment.iban}`;
  }
}

console.log(describe({ method: "card", last4: "4242" }));
console.log(describe({ method: "cash" }));
console.log(describe({ method: "transfer", iban: "DE00 1234" }));

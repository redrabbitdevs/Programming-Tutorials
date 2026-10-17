function sql(strings, ...values) {
  let text = strings[0];
  values.forEach((_, i) => {
    text += `$${i + 1}` + strings[i + 1];
  });
  return { text, values };
}

const name = "x' OR '1'='1";
const limit = 10;
console.log(sql`SELECT * FROM users WHERE name = ${name} LIMIT ${limit}`);

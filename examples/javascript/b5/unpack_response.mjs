const response = {
  status: 200,
  data: { items: ["a", "b", "c"], total: 3 },
};

const {
  status,
  data: {
    items: [first, ...others],
    total,
  },
} = response;

console.log(status, first, total, others);

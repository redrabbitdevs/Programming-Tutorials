type LooseState = {
  loading: boolean;
  data?: string[];
  error?: string;
};

const impossible: LooseState = {
  loading: true,
  data: ["a"],
  error: "also failed",
};

console.log(impossible);

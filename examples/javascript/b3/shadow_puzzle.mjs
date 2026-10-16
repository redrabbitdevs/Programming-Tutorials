const label = "outer";

{
  const label = "inner";
  console.log(label);

  {
    const label = "innermost";
    console.log(label);
  }

  console.log(label);
}

console.log(label);

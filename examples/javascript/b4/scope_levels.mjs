const appName = "demo";

function outer() {
  const level = "outer function";

  function inner() {
    const innerValue = "inner function";
    console.log(appName, level, innerValue);
  }

  inner();
  try {
    console.log(innerValue);
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
}

outer();

const x = "module";
function shadow() {
  const x = "function";
  {
    const x = "block";
    console.log(x);
  }
  console.log(x);
}
shadow();
console.log(x);

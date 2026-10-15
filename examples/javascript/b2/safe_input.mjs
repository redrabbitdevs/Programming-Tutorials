function show(item) {
  console.log(JSON.stringify(item), Number(item), parseInt(item, 10));
}

show("10");
show("x");
show("");
show("7.5");

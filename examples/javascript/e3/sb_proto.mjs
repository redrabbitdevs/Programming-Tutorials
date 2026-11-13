const input = JSON.parse('{"__proto__": {"isAdmin": true}}');
try {
  const target = {};
  target.__proto__ = input.__proto__;
  console.log("target.isAdmin:", target.isAdmin);
  console.log("'__proto__' in {}:", "__proto__" in {});
} catch (error) {
  console.log(error.code);
}

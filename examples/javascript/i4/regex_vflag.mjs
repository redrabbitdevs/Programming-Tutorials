const text = "naïve Straße ΑΒγ";
console.log(text.match(/[\p{L}--[a-z]]/gv));
console.log(text.match(/[\p{Script=Greek}&&\p{Lu}]/gv));
console.log(text.match(/[\p{L}--\p{ASCII}--\p{Script=Greek}]/gv));

console.log("a😀b".match(/\p{RGI_Emoji}/gv));
console.log(/^[\q{ab|cd}x]$/v.test("cd"));

try {
  new RegExp("[a-z&&]", "v");
} catch (error) {
  console.log(error.name);
}

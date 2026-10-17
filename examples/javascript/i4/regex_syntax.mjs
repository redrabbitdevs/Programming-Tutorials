console.log("a-b_c d".match(/[a-c]/g));
console.log("x1 y22 z".match(/[a-z]\d+/g));

const phone = /^\d{3}-\d{4}$/;
console.log(phone.test("555-1234"), phone.test("555-12345"));
console.log(/\d+/.test("abc123"), /^\d+$/.test("abc123"));

const html = "<b>bold</b><i>it</i>";
console.log(html.match(/<.+>/)[0]);
console.log(html.match(/<.+?>/)[0]);

console.log("cat dog bird".match(/cat|bird/g));
console.log("ha haha hahaha".match(/(?:ha){2,}/g));

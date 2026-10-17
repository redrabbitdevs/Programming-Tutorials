const text = "Call (555) 123-4567 or 555.987.6543, not 12-34.";
const phone = /\(?(\d{3})\)?[ .-]?(\d{3})[.-](\d{4})/g;
console.log(text.replace(phone, "$1-$2-$3"));

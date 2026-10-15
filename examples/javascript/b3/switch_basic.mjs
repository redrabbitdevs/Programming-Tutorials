function dayType(day) {
  switch (day) {
    case "sat":
    case "sun":
      return "weekend";
    case "mon":
    case "tue":
    case "wed":
    case "thu":
    case "fri":
      return "weekday";
    default:
      return "unknown";
  }
}

console.log(dayType("sun"), dayType("wed"), dayType("xyz"));

const level = 2;
switch (level) {
  case 1:
    console.log("one");
  case 2:
    console.log("two");
  case 3:
    console.log("three");
    break;
  case 4:
    console.log("four");
}

switch ("5") {
  case 5:
    console.log("matched the number");
    break;
  default:
    console.log("strict comparison: no match");
}

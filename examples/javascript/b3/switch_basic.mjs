const day = "sun";

switch (day) {
  case "sat":
  case "sun":
    console.log("weekend");
    break;
  case "mon":
  case "tue":
  case "wed":
  case "thu":
  case "fri":
    console.log("weekday");
    break;
  default:
    console.log("unknown");
}

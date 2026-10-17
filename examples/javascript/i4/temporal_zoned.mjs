const meeting = Temporal.ZonedDateTime.from(
  "2026-03-09T09:00:00[America/New_York]",
);
console.log(meeting.toString());
console.log(meeting.offset, meeting.timeZoneId, meeting.hour);

const london = meeting.withTimeZone("Europe/London");
const tokyo = meeting.withTimeZone("Asia/Tokyo");
console.log(london.toString());
console.log(tokyo.toString());
console.log(meeting.epochMilliseconds === tokyo.epochMilliseconds);

const eve = Temporal.ZonedDateTime.from("2026-03-07T12:00[America/New_York]");
console.log(eve.add({ days: 2 }).toString());
console.log(eve.add({ hours: 48 }).toString());
console.log(eve.until(eve.add({ days: 1 })).toString());

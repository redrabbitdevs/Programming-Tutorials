const zones = ["America/New_York", "Europe/London", "Asia/Tokyo"];
const style = { dateStyle: "medium", timeStyle: "short", hourCycle: "h23" };

function plan(start, hostZone) {
  const host = Temporal.ZonedDateTime.from(`${start}[${hostZone}]`);
  for (const zone of zones) {
    const local = host.withTimeZone(zone);
    console.log(zone.padEnd(16), local.toLocaleString("en-GB", style));
  }
}

plan("2026-03-09T09:00", "America/New_York");
plan("2026-03-30T09:00", "Europe/London");

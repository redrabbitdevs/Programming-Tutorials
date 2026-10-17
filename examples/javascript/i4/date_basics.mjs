const epoch = new Date(0);
console.log(epoch.toISOString(), epoch.getTime());

const moment = new Date("2026-03-14T15:30:00Z");
console.log(moment.getTime());
console.log(moment.toISOString());
console.log(JSON.stringify({ at: moment }));

const fromParts = new Date(Date.UTC(2026, 2, 14, 15, 30));
console.log(fromParts.getTime() === moment.getTime());
console.log(typeof Date.now(), typeof Date());
console.log(moment - epoch === moment.getTime());

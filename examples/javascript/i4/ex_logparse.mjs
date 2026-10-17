const line = /^(?<time>\d\d:\d\d) \[(?<level>[A-Z]+)\] (?<msg>.+)$/;

const logs = [
  "09:15 [INFO] server started",
  "09:16 [WARN] disk at 91%",
  "garbage line",
  "09:20 [ERROR] connection lost",
];

for (const text of logs) {
  const parts = line.exec(text)?.groups;
  if (parts) {
    console.log(`${parts.level.padEnd(5)} ${parts.time} ${parts.msg}`);
  }
}

const LOG = `2026-03-14T09:00:01Z INFO web: server started
2026-03-14T09:15:02Z ERROR db: connection lost after 1523 ms
2026-03-14T09:15:09Z WARN web: slow request took 840 ms
2026-03-14T09:40:30Z ERROR cache: miss storm
this line is not a log line
2026-03-14T10:05:45Z INFO web: request ok in 120 ms
2026-03-14T10:30:00Z ERROR db: timeout after 3011 ms
2026-03-14T11:02:13Z DEBUG web: cache warmed`.split("\n");

const LINE =
  /^(?<time>\S+) (?<level>[A-Z]+) (?<source>[\w-]+): (?<text>.*)$/;

class Entry {
  #instant;

  constructor({ time, level, source, text }) {
    this.#instant = Temporal.Instant.from(time);
    Object.assign(this, { level, source, text });
  }

  get instant() {
    return this.#instant;
  }

  static parse(line) {
    const groups = LINE.exec(line)?.groups;
    return groups ? new Entry(groups) : null;
  }
}

const first = Entry.parse(LOG[1]);
console.log(first.level, first.source, first.instant.toString());
console.log(Entry.parse(LOG[4]));

function* entries(lines) {
  for (const line of lines) {
    const entry = Entry.parse(line);
    if (entry) yield entry;
  }
}

const errors = entries(LOG).filter((entry) => entry.level === "ERROR");
console.log(errors.map((entry) => entry.source).toArray());
console.log(entries(LOG).take(2).map((entry) => entry.source).toArray());

const byLevel = Map.groupBy(entries(LOG), (entry) => entry.level);
for (const [level, group] of byLevel) {
  console.log(level.padEnd(5), group.length);
}

const list = new Intl.ListFormat("en");
const plural = new Intl.PluralRules("en");
const words = { one: "error", other: "errors" };
const failed = byLevel.get("ERROR");
const sources = new Set(failed.map((entry) => entry.source));
const count = failed.length;
console.log(count, words[plural.select(count)], "in", list.format(sources));

const all = [...entries(LOG)];
const span = all[0].instant.until(all.at(-1).instant, { largestUnit: "hour" });
console.log(span.toString(), new Intl.DurationFormat("en").format(span));

const sinceLast = failed.at(-1).instant.until(all.at(-1).instant);
const minutes = Math.floor(sinceLast.total("minute"));
console.log(new Intl.RelativeTimeFormat("en").format(-minutes, "minute"));

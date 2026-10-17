import { setTimeout as sleep } from "node:timers/promises";

async function firstReason(userCancelsAfter) {
  const user = new AbortController();
  const signal = AbortSignal.any([user.signal, AbortSignal.timeout(30)]);
  if (userCancelsAfter !== null) {
    setTimeout(() => user.abort(), userCancelsAfter);
  }
  await sleep(1000, null, { signal }).catch(() => {});
  return signal.reason.name;
}

console.log(await firstReason(5));
console.log(await firstReason(null));

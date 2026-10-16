const visits = new WeakMap();

function track(page) {
  visits.set(page, (visits.get(page) ?? 0) + 1);
  return visits.get(page);
}

const home = { url: "/home" };
const about = { url: "/about" };

track(home);
track(home);
console.log(track(home), track(about));
console.log(home);

export function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomArray(random, maxLength = 20) {
  const length = Math.floor(random() * (maxLength + 1));
  return Array.from({ length }, () => Math.floor(random() * 100));
}

const holds = (property, input) => {
  try {
    return property(input) !== false;
  } catch {
    return false;
  }
};

function shrink(array, property) {
  for (let size = array.length; size >= 1; size--) {
    for (let start = 0; start + size <= array.length; start++) {
      const smaller = array.toSpliced(start, size);
      if (!holds(property, smaller)) return shrink(smaller, property);
    }
  }
  return array;
}

export function forAll(property, { runs = 100, seed = 1 } = {}) {
  const random = mulberry32(seed);
  for (let run = 1; run <= runs; run++) {
    const input = randomArray(random);
    if (!holds(property, input)) {
      return { run, seed, input, shrunk: shrink(input, property) };
    }
  }
  return null;
}

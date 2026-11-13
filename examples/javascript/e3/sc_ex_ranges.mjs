const manifest = {
  dependencies: {
    "left-trim": "1.4.0",
    "fast-image": "^3.0.1",
    "colour-utils": "github:someone/colour-utils",
    "tiny-date": "https://downloads.example.net/tiny-date-2.1.0.tgz",
    "logger": "*",
    "http-client": "latest",
  },
  devDependencies: { "test-kit": ">=2" },
};

// Why a version specifier lets unreviewed code in, or null if it is fine.
function risk(spec) {
  if (spec === "*" || spec === "" || spec === "latest") return "any version";
  if (/^>=?\s*\d/.test(spec)) return "no upper bound";
  if (/^(git|github:|git\+|ssh:)/.test(spec)) return "git source";
  if (/^https?:/.test(spec)) return "tarball URL";
  return null;
}

for (const field of ["dependencies", "devDependencies"]) {
  for (const [name, spec] of Object.entries(manifest[field])) {
    const why = risk(spec);
    if (why) console.log(`${field}.${name}: ${spec} (${why})`);
  }
}

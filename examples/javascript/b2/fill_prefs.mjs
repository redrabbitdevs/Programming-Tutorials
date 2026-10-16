const prefs = { theme: "", fontSize: 0, language: undefined };

prefs.theme ||= "light";
prefs.fontSize ??= 16;
prefs.language ??= "en";

console.log(prefs);

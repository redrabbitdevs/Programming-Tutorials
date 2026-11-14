interface Settings {
  theme?: string;
  fontSize: number;
}

const minimal: Settings = { fontSize: 14 };
const full: Settings = { fontSize: 16, theme: "dark" };

function describe(settings: Settings): string {
  const theme: string | undefined = settings.theme;
  return `${settings.fontSize}px ${theme ?? "default"}`;
}

console.log(describe(minimal), describe(full));

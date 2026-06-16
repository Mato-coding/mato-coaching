import type { Config } from "tailwindcss";

// Tailwind v4: Tokens leben in globals.css (@theme). Content wird automatisch erkannt.
// Diese Datei ist optional — du kannst sie löschen. Behalte sie nur, wenn du später
// Plugins ergänzen willst. Die alten, toten Farb-Referenzen wurden entfernt.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
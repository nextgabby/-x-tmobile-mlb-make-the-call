import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tm: {
          magenta: "#E20074",
          "magenta-hot": "#FF3D9A",
          ink: "#0A0A0C",
        },
        sea: {
          navy: "#0C2C56",
          green: "#005C5C",
          silver: "#C4CED4",
          dirt: "#8B5A3C",
          grass: "#3F7A3A",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        phone: "28rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

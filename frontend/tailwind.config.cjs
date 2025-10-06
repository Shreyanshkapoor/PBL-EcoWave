// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        brand: {
          dark: "#0b1220", // background used in Hero + Header
          blue: "#3b82f6", // CTA button blue (Tailwind's default blue-500)
          light: "#e2e8f0",
          accent: "#22c55e",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.15)",
        "card-lg": "0 10px 30px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        xl: "1rem",
      },
      backgroundImage: {
        "radial-faded":
          "radial-gradient(1000px 600px at 10% -20%, rgba(59,130,246,0.25), rgba(59,130,246,0) 60%), radial-gradient(800px 500px at 110% 10%, rgba(34,197,94,0.18), rgba(34,197,94,0) 55%)",
      },
    },
  },
  plugins: [],
};
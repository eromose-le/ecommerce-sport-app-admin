/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./common/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // important: "#app",
  theme: {
    extend: {
      colors: {
        primary: {
          main: "var(--green)",
        },
      },
      boxShadow: {
        sm: "0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        crimson: ["Crimson Pro", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderColor: {
        dark: "var(--grey)",
        light: "var(--light-grey)",
        grey: "var(--border-grey)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
        6: "6px",
      },
      borderColor: {
        dark: "var(--grey)",
        light: "var(--light-grey)",
        grey: "var(--border-grey)",
      },
      screens: {
        xs: "445px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1720px",
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        semibold: "500",
        bold: "600",
        extrabold: "700",
        black: "800",
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "mobile-xl": "0.6312rem", // 10.1px
        "2xl": "1.5rem", // 24px
        "mobile-2xl": "0.9375rem", // 15px
        "3xl": "1.875rem", // 30px
        "mobile-3xl": "1.25rem", // 20px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "mobile-5xl": "1.75rem", // 28px
        "6xl": "4rem", // 64px
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};

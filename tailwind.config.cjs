module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        shadcn: {
          bg: "rgb(var(--shadcn-bg) / <alpha-value>)",
          foreground: "rgb(var(--shadcn-foreground) / <alpha-value>)",
          muted: "rgb(var(--shadcn-muted) / <alpha-value>)",
          primary: "rgb(var(--shadcn-primary) / <alpha-value>)",
          secondary: "rgb(var(--shadcn-secondary) / <alpha-value>)",
          border: "rgb(var(--shadcn-border) / <alpha-value>)",
          card: "rgb(var(--shadcn-card) / <alpha-value>)",
          success: "rgb(var(--shadcn-success) / <alpha-value>)",
          warning: "rgb(var(--shadcn-warning) / <alpha-value>)",
          destructive: "rgb(var(--shadcn-destructive) / <alpha-value>)",
        },
      },
      borderRadius: {
        "sh-sm": "6px",
        "sh-md": "10px",
        "sh-lg": "14px",
      },
      boxShadow: {
        "sh-sm": "0 1px 2px rgba(2,6,23,0.06)",
        "sh-md": "0 6px 18px rgba(2,6,23,0.08)",
      },
    },
  },
  plugins: [],
};

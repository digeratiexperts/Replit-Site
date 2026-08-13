module.exports = {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "paragraph-2": "var(--paragraph-2-font-family)",
        // Primary font system - Space Grotesk for headings, Inter for body
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Oxanium"', '"JetBrains Mono"', 'monospace'],
        // Legacy support
        poppins: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        de: {
          bg: "var(--de-bg)",
          surface: "var(--de-surface)",
          raised: "var(--de-raised)",
          hairline: "var(--de-hairline)",
          paper: "var(--de-paper)",
          "paper-raised": "var(--de-paper-raised)",
          "paper-hairline": "var(--de-paper-hairline)",
          magenta: "var(--de-magenta)",
          violet: "var(--de-violet)",
          ink: "var(--de-ink)",
          "ink-muted": "var(--de-ink-muted)",
        },
      },
      fontSize: {
        "de-display": ["var(--de-fs-display)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "de-h2": ["var(--de-fs-h2)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "de-h3": ["var(--de-fs-h3)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "de-lead": ["var(--de-fs-lead)", { lineHeight: "1.6" }],
        "de-eyebrow": ["var(--de-fs-eyebrow)", { lineHeight: "1.35", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        "de-content": "var(--de-w-content)",
        "de-wide": "var(--de-w-wide)",
        "de-prose": "var(--de-w-prose)",
      },
      spacing: {
        "de-section": "var(--de-section-y)",
        "de-section-lg": "var(--de-section-y-lg)",
        "de-section-sm": "var(--de-section-y-sm)",
        "de-gutter": "var(--de-gutter)",
      },
      boxShadow: {
        "de-sm": "var(--de-shadow-sm)",
        "de-md": "var(--de-shadow-md)",
        "de-paper": "var(--de-shadow-paper)",
        "de-cta": "var(--de-shadow-cta)",
      },
      transitionDuration: {
        "de-fast": "var(--de-dur-fast)",
        de: "var(--de-dur)",
        "de-slow": "var(--de-dur-slow)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "de-card": "var(--de-radius-card)",
        "de-panel": "var(--de-radius-panel)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "1rem", screens: { "2xl": "1680px" } },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  darkMode: ["class"],
};

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Taste 2: Editorial Pediatric Almanac Colors
        almanac: {
          canvas: '#FBFBF9',
          subtle: '#F4F4F0',
          elevated: '#FFFFFF',
          ink: '#111413',
          body: '#494F4C',
          mute: '#858C88',
          hairline: '#E3E3DC',
          'hairline-soft': '#EDEDEA',
          spruce: '#143D2B',
          'spruce-soft': '#EAF3EE',
          amber: '#B45309',
          'amber-soft': '#FEF3C7',
          destructive: '#DC2626',
        },
        // Parent Calm Canonical Tokens (Backward-compatible)
        sage: {
          50: '#F0FDF4',
          100: '#EAF3EE',
          200: '#BBF7D0',
          500: '#52B788',
          600: '#143D2B',
          700: '#0E2B1E',
          900: '#081C15',
        },
        terracotta: {
          50: '#FDF6F0',
          100: '#FBECE2',
          500: '#E07A5F',
          600: '#B45309',
          700: '#92400E',
        },
        teal: {
          50: '#EAF3EE',
          100: '#D1E7DD',
          500: '#1B5E3C',
          600: '#143D2B',
          700: '#0E2B1E',
        },
        cream: {
          50: '#FBFBF9',
          100: '#F4F4F0',
          200: '#EDEDEA',
        },
        slate: {
          850: '#111413',
          900: '#111413',
        },
        road: {
          pre: '#143D2B',
          active: '#111413',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;

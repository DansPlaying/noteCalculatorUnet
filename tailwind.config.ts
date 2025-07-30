import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3D404B',
        secondary: '#f1f6fd',
      },
    },
  },
  plugins: [],
}

export default config

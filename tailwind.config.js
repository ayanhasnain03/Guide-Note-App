module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.tsx',
    './lib/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1215'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};

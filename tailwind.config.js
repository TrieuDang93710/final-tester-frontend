/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#39DB4A',
        red: '#FF6868',
        secondary: '#555',
        primaryBG: '#FCFCFC'
      },
      screens: {
        ssm: '368px',

        sm: '576px',

        md: '768px',

        lg: '992px',

        xl: '1200px',

        '2xl': '1440px'
      }
    }
  },
  plugins: [require('daisyui')]
};

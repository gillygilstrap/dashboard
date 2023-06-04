/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      scale :  {
        '101' : '1.01',
        '1005' : '1.005',
        '1002' : '1.002'
      }
    },
  },
  plugins: [],
}


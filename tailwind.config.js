module.exports = {
  mode: 'jit',
  purge: ['./src/*.html'],
  darkmode: false,
  content: ['./src/**/*.{html,js}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};

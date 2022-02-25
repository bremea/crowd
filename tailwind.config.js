/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          /* your theme name */ primary: '#a50428' /* Primary color */,
          'primary-focus': '#700119' /* Primary color - focused */,
          'primary-content':
            '#ffffff' /* Foreground content color to use on primary color */,

          secondary: '#fec323' /* Secondary color */,
          'secondary-focus': '#b88a0b' /* Secondary color - focused */,
          'secondary-content':
            '#000000' /* Foreground content color to use on secondary color */,

          accent: '#005f21' /* Accent color */,
          'accent-focus': '#004f1c' /* Accent color - focused */,
          'accent-content':
            '#000000' /* Foreground content color to use on accent color */,

          neutral: '#ffffff' /* Neutral color */,
          'neutral-focus': '#ffffff' /* Neutral color - focused */,
          'neutral-content':
            '#000000' /* Foreground content color to use on neutral color */,

          'base-100':
            '#ffffff' /* Base color of page, used for blank backgrounds */,
          'base-200': '#d9d9d9' /* Base color, a little darker */,
          'base-300': '#bfbfbf' /* Base color, even more darker */,
          'base-content':
            '#000000' /* Foreground content color to use on base color */,

          info: '#2094f3' /* Info */,
          success: '#009485' /* Success */,
          warning: '#ff9900' /* Warning */,
          error: '#ff5724' /* Error */,
        },
      },
    ],
  },
};

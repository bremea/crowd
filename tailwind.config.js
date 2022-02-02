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
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: withOpacityValue('--tw-color-primary-50'),
          100: withOpacityValue('--tw-color-primary-100'),
          200: withOpacityValue('--tw-color-primary-200'),
          300: withOpacityValue('--tw-color-primary-300'),
          400: withOpacityValue('--tw-color-primary-400'),
          500: withOpacityValue('--tw-color-primary-500'),
          600: withOpacityValue('--tw-color-primary-600'),
          700: withOpacityValue('--tw-color-primary-700'),
          800: withOpacityValue('--tw-color-primary-800'),
          900: withOpacityValue('--tw-color-primary-900'),
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
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
            '#ffffff' /* Foreground content color to use on secondary color */,

          accent: '#005f21' /* Accent color */,
          'accent-focus': '#004f1c' /* Accent color - focused */,
          'accent-content':
            '#ffffff' /* Foreground content color to use on accent color */,

          neutral: '#ffffff' /* Neutral color */,
          'neutral-focus': '#ffffff' /* Neutral color - focused */,
          'neutral-content':
            '#ffffff' /* Foreground content color to use on neutral color */,

          'base-100':
            '#000000' /* Base color of page, used for blank backgrounds */,
          'base-200': '#000000' /* Base color, a little darker */,
          'base-300': '#000000' /* Base color, even more darker */,
          'base-content':
            '#ffffff' /* Foreground content color to use on base color */,

          info: '#2094f3' /* Info */,
          success: '#009485' /* Success */,
          warning: '#ff9900' /* Warning */,
          error: '#ff5724' /* Error */,
        },
      },
    ],
  },
};

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-icon': 'url("/harmony_spirit.png")',
      },
      backgroundPosition: {
        'header-icon': '100% center',
      },
      backgroundSize: {
        'header-icon': 'auto 100%',
      },
      colors: {
        'header-bg': '#c1c8f1',
      },
      height: {
        unset: 'unset',
      },
      maxWidth: {
        'header-max': '1100px',
      },
    },
  },
  important: '.ant-layout',
  plugins: [],
};
export default config;

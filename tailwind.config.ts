import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ['./node_modules/flowbite-react/**/*.js', "./src/**/*.tsx", './public/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
} satisfies Config;

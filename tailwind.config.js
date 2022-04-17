const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: 'class',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./modules/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Lato', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    DEFAULT: colors.indigo["600"],
                    neutral: colors.indigo["600"],
                    light: colors.indigo["500"],
                    dark: colors.indigo["700"]
                },
                accent: {
                    DEFAULT: "#E546DD",
                    neutral: "#E546DD",
                    light: "#EA6AE4",
                    dark: "#D51ECC"
                },
                primary: {
                    DEFAULT: colors.gray["700"],
                    neutral: colors.gray["700"],
                    dark: colors.gray["900"],
                    light: colors.gray["500"],
                    'extra-light': colors.gray["300"]
                },
                secondary: {
                    DEFAULT: colors.gray["300"],
                    neutral: colors.gray["300"],
                    dark: colors.gray["500"],
                    light: colors.gray["100"],

                    'neutral-inverted': colors.gray["800"],
                    'dark-inverted': colors.gray["900"],
                    'light-inverted': colors.gray["700"],
                },
                warning: {
                    DEFAULT: colors.red["500"],
                    neutral: colors.red["500"]
                },
                success: {
                    DEFAULT: colors.green["500"],
                    neutral: colors.green["500"]
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
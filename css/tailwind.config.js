const themeDir = __dirname + '/../../';
// const defaultTheme = require('tailwindcss/defaultTheme')

const disabledCss = {
    'code::before': false,
    'code::after': false,
    'blockquote p:first-of-type::before': false,
    'blockquote p:last-of-type::after': false,
    pre: false,
    code: false,
    'pre code': false,
    'code::before': false,
    'code::after': false,
}

module.exports = {
    content: [
        `${themeDir}/hugo_stats.json`,
    ],
    theme: {
        extend: {
            colors: {
                'card-foreground': 'hsl(210, 40%, 98%)',
                'card-background': 'hsl(222.2, 84%, 4.9%)',
                'primary': 'hsl(217.2, 91.2%, 59.8%)',
                'primary-foreground': 'hsl(222.2, 47.4%, 11.2%)',
                'secondary': 'hsl(217.2, 32.6%, 17.5%)',
                'secondary-foreground': 'hsl(210, 40%, 98%)',
                'muted': 'hsl(217.2, 32.6%, 17.5%)',
                'muted-foreground': 'hsl(215, 20.2%, 65.1%)',
                'primary-bg': '#002DC9',
                'primary-light': '#EDEEF7',
                'primary-dark': '#151927',
                'label': '#5C6178'
            },
            typography: {
                DEFAULT: { css: disabledCss },
                base: { css: disabledCss },
                sm: { css: disabledCss },
                lg: { css: disabledCss },
                xl: { css: disabledCss },
                '2xl': { css: disabledCss },
            },
            backgroundImage: {
                'hero-pattern': "url('/hero-pattern.svg')",
                'izzy': "url(/izzy.png)",
            },
            fontFamily: {
                'primary': ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
                'secondary': ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
                'tertiary': ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
                'complementary': ['"DM Mono"', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
            }
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/typography'),]
}
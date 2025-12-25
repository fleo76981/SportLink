/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                indigo: {
                    600: '#4f46e5',
                },
            },
            borderRadius: {
                '2rem': '2rem',
            },
        },
    },
    plugins: [],
}

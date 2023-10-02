import { createGlobalStyle } from 'styled-components';

/* ----- Font famlies ----- */
/* 
    font-family: 'Montserrat', sans-serif;
    font-family: 'Mooli', sans-serif;   -- fancy look
    font-family: 'Nunito Sans', sans-serif;
    font-family: 'Roboto', sans-serif;
    font-family: 'Roboto Mono', monospace; 
    */
const GlobalStyles = createGlobalStyle`
:root {
    /* teal */
    --color-primary-50: #F0FDFA;
    --color-primary-100:  #CCFBF1;
    --color-primary-200: #99F6E4 ;
    --color-primary-500:  #14B8A6;
    --color-primary-600:  #0D9488;
    --color-primary-700:  #0F766E;
    --color-primary-800: #115E59 ;
    --color-primary-900:  #134E4A;

    /* Toastify customizations */
    --toastify-font-family: inherit;
    
    &, &.light-mode{
        /* Grey */
        --color-grey-0: #fff;
        --color-grey-0-opac: rgba(255,255,255,0.8);
        --color-grey-50: #f9fafb;
        --color-grey-100: #f3f4f6;
        --color-grey-200: #e5e7eb;
        --color-grey-300: #d1d5db;
        --color-grey-400: #9ca3af;
        --color-grey-500: #6b7280;
        --color-grey-600: #4b5563;
        --color-grey-700: #374151;
        --color-grey-800: #1f2937;
        --color-grey-900: #111827;

        
        --color-silver-100: #e5e7eb;
        --color-silver-700: #374151;
        --color-teal-100: #CCFBF1;
        --color-teal-700: #0F766E;

        --color-red-100: #fee2e2;
        --color-red-700: #b91c1c;
        --color-red-800: #991b1b;

        --backdrop-color: rgba(13, 148, 136, 0.05);

        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

        --image-grayscale: 0;
        --image-opacity: 100%;
    }

    /* For dark mode */
    &.dark-mode{
        --color-grey-0: #18212f;
        --color-grey-0-opac: rgba(0,0,0,0.8);

        --color-grey-50: #111827;
        --color-grey-100: #1f2937;
        --color-grey-200: #374151;
        --color-grey-300: #4b5563;
        --color-grey-400: #6b7280;
        --color-grey-500: #9ca3af;
        --color-grey-600: #d1d5db;
        --color-grey-700: #e5e7eb;
        --color-grey-800: #f3f4f6;
        --color-grey-900: #f9fafb;

        --color-silver-100: #374151;
        --color-silver-700: #f3f4f6;
        --color-teal-100: #0F766E;
        --color-teal-700: #CCFBF1;

        --color-red-100: #fee2e2;
        --color-red-700: #b91c1c;
        --color-red-800: #991b1b;

        --backdrop-color: rgba(0, 0, 0, 0.3);

        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

        --image-grayscale: 10%;
        --image-opacity: 90%;
    }   
}


*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background-color 0.3s, border 0.3s;
}

/* FIXME: change the colors of scrollbar */

::-webkit-scrollbar {
    width: 6px;
    height: 4px;
}

::-webkit-scrollbar-thumb {
    background-color: #222;
    border-radius: 2.8rem;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #eee;
}

html {
    font-size: 62.5%;
}

body {
    font-family: 'Montserrat', sans-serif;
    color: var(--color-grey-700);
    background-color: var(--color-grey-50); // for check

    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
}

input,
button,
textarea,
select {
    font: inherit;
    color: inherit;
}

button {
    cursor: pointer;
}

*:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    ${'' /* background-color: red; */}
}

input:focus,
button:focus,
textarea:focus,
select:focus {
    outline: 2px solid #14B8A6;
    outline-offset: -1px;
}

button:has(svg) {
    line-height: 0;
}

a {
    color: inherit;
    text-decoration: none;
}                                                                   

ul {
    list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
    overflow-wrap: break-word;
    hyphens: auto;
}  

`;

export default GlobalStyles;

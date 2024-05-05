
type ThemeTypes = 'dark' | 'light';

export let currentTheme: ThemeTypes = 'light';

export const setTheme = (theme:ThemeTypes=currentTheme) =>{
    window.document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("chuanyang-blog-theme", theme);
    currentTheme = theme;
}

export const getTheme = ():ThemeTypes =>{
    return window.localStorage.getItem("chuanyang-blog-theme") as ThemeTypes || currentTheme;
}
import { 
    TodoBoostrapTheme, 
    TodoBulmaTheme, 
    TodoComponent, 
    TodoFoundationTheme, 
    TodoMaterializeTheme, 
    TodoTailwindTheme 
} from "./components/todo";

const themes = {
    Default: TodoBoostrapTheme,
    Bootstrap: TodoBoostrapTheme,
    Bulma: TodoBulmaTheme,
    Foundation: TodoFoundationTheme,
    Materialize: TodoMaterializeTheme,
    Tailwind: TodoTailwindTheme
}

const cssImport = {
    Default: () => import('./css/app.css'),
    Bootstrap: () =>  import('./css/bootstrap.scss'),
    Bulma: () => {import('./css/bulma.scss'); import('./css/bulma.css')},
    Foundation: () => {import('./css/foundation.scss'); import('./css/foundation.css')},
    Materialize: () => {import('./css/materialize.scss'); import('./css/materialize.css')},
    Tailwind: () => import('./css/tailwind.css')
}

const appEl = document.getElementById('app');

const themeSelector = document.createElement('select');
Object.keys(themes).forEach((theme) => {
    const option = document.createElement('option');
    option.value = theme;
    option.text = theme;
    themeSelector.appendChild(option);
});
appEl?.appendChild(themeSelector);

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

let currentTodo: TodoComponent | null = null;

async function loadTheme(theme: keyof typeof themes) {
document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

if(theme !== 'Default') {
    await cssImport[theme]();
}

if(currentTodo && todoWrapper) {
    todoWrapper.innerHTML = '';
}
currentTodo = new TodoComponent( {
    theme: themes[theme] || undefined,
});

currentTodo.mount(todoWrapper);
}

loadTheme('Default');
themeSelector.value = 'Default';

themeSelector.addEventListener('change', (e) => {
const theme = (e.target as HTMLSelectElement).value as keyof typeof themes;
loadTheme(theme);
});



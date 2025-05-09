import { router } from '../app';
import { TodoComponent, TodoBoostrapTheme, TodoStorageProvider } from '../components/todo';

import { IPage } from './IPage';

export default class TodoPage implements IPage {
    #rootElement: HTMLElement;
    #todoComponent: TodoComponent;

    constructor(params?: { storage: TodoStorageProvider }) {

        this.#rootElement = document.createElement('div');
        this.#rootElement.classList.add('d-flex', 'flex-column', 'vh-100', 'bg-light');

        this.#todoComponent = new TodoComponent({
            theme: TodoBoostrapTheme,
            storage: params?.storage
        });
    }

    mount(parentElement: HTMLElement): HTMLElement {
        // Create header
        const header = document.createElement('header');
        header.classList.add('p-3', 'bg-primary', 'text-white', 'shadow-sm');

        // Create a container for header content
        const headerContainer = document.createElement('div');
        headerContainer.classList.add('d-flex', 'align-items-center');

        // Create the title
        const title = document.createElement('h1');
        title.classList.add('m-0', 'fs-4', 'flex-grow-1', 'text-center');
        title.textContent = 'My Todo List';

        // Create the back button
        const backButton = document.createElement('button');
        backButton.innerHTML = '<i class="bi bi-chevron-left"></i> Back';
        backButton.classList.add('btn', 'btn-light', 'me-3');
        backButton.addEventListener('click', () => {
            router.goto('Start');
        });

        // Add button and title to the container (button first now)
        headerContainer.appendChild(backButton);
        headerContainer.appendChild(title);

        // Set header content
        header.appendChild(headerContainer);

        // Create main content area
        const mainContent = document.createElement('main');
        mainContent.classList.add('flex-grow-1', 'overflow-auto', 'p-3');

        // Mount todo component
        const todoWrapper = document.createElement('div');
        todoWrapper.setAttribute('id', 'todo-list');
        todoWrapper.classList.add('h-100', 'mx-auto', 'bg-white', 'rounded', 'shadow-sm');
        todoWrapper.style.maxWidth = '800px';
        this.#todoComponent.mount(todoWrapper);

        // Assemble the page
        this.#rootElement.appendChild(header);
        mainContent.appendChild(todoWrapper);
        this.#rootElement.appendChild(mainContent);

        // Mount to parent
        parentElement.appendChild(this.#rootElement);

        return this.#rootElement;
    }

    unmount(): void {
        // Clean up todo component
        // TODO implement better todo component disposal
        const todoWrapper = document.getElementById('todo-list');
        if (todoWrapper) {
            todoWrapper.innerHTML = '';
        }

        // Remove the root element
        if (this.#rootElement && this.#rootElement.parentElement) {
            this.#rootElement.parentElement.removeChild(this.#rootElement);
        }
    }
} 
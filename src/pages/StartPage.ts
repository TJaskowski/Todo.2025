import { router } from "../app";
import { IPage } from "./IPage";

export default class StartPage implements IPage {
    #rootEl: HTMLElement | undefined;

    mount(parentEl: HTMLElement): HTMLElement {
        this.#rootEl = document.createElement('div');
        this.#rootEl.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'vh-100', 'bg-light', 'text-dark');

        const title = document.createElement('h1');
        title.classList.add('mb-5', 'display-4', 'text-center');
        title.textContent = 'Witaj! Wybierz rodzaj magazynu danych';
        this.#rootEl.appendChild(title);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('d-flex', 'flex-wrap', 'gap-4', 'justify-content-center');

        const options = [
            { label: 'Lokalny magazyn (LocalStorage)', value: 'LocalStorage' },
            { label: 'Baza w przeglądarce (IndexedDb)', value: 'IndexedDb' },
            { label: 'Zewnętrzny serwer (Backend)', value: 'Backend' }
        ];

        options.forEach(({ label, value }) => {
            const cardBtn = document.createElement('button');
            cardBtn.textContent = label;
            cardBtn.classList.add(
                'btn',
                'btn-outline-primary',
                'p-4',
                'shadow-sm',
                'rounded',
                'text-center',
                'fs-5',
                'w-100'
            );
            cardBtn.style.transition = 'transform 0.2s ease';
            cardBtn.style.minWidth = '250px';

            cardBtn.addEventListener('mouseenter', () => {
                cardBtn.style.transform = 'scale(1.05)';
            });

            cardBtn.addEventListener('mouseleave', () => {
                cardBtn.style.transform = 'scale(1)';
            });

            cardBtn.addEventListener('click', () => {
                console.log(`Wybrano: ${value}`);
                if(value === 'Backend') {
                router.goto('Login', { storage: value });
            }
                else
                router.goto('Todo', {storage: value});
            });

            buttonsContainer.appendChild(cardBtn);
        });

        this.#rootEl.appendChild(buttonsContainer);
        parentEl.appendChild(this.#rootEl);

        return this.#rootEl;
    }

    unmount(): void {
        if (this.#rootEl) {
            this.#rootEl.remove();
            this.#rootEl = undefined;
        }
    }
}
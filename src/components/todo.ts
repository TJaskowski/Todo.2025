export class TodoComponent {
  #listEl: HTMLElement | undefined;
  #inputEl: HTMLTextAreaElement | undefined;

  #theme: TodoThemeSchema | undefined

  constructor(options?: TodoOptions) {
    this.#theme = options?.theme
  }

  mount(targetEl: HTMLElement) {
    targetEl.classList.add(...classUnify(this.#theme?.root ?? 'todo'));

    this.#listEl = document.createElement('ul');
    this.#listEl.classList.add(...classUnify(this.#theme?.list ?? 'todo-list'));

    const footerEl = document.createElement('form');
    footerEl.classList.add(...classUnify(this.#theme?.footer ?? 'todo-footer'));

    this.#inputEl = document.createElement('textarea');
    this.#inputEl.classList.add(...classUnify(this.#theme?.footer_input ?? ''));

    const addButtonEl = document.createElement('button');
    addButtonEl.textContent = 'Dodaj'
    addButtonEl.classList.add(...classUnify(this.#theme?.footer_addButton ?? ''));
    addButtonEl.addEventListener('click', (evt) => {
      this.addItem()
      evt.preventDefault()
    })

    targetEl.appendChild(this.#listEl);
    targetEl.appendChild(footerEl);
    footerEl.appendChild(this.#inputEl);
    footerEl.appendChild(addButtonEl);
  }

  addItem(extText?: string) {
    if (!this.#inputEl || !this.#listEl) throw new Error('Component probaly not initialized!');

    const itemEl = document.createElement('li')
    itemEl.classList.add(...classUnify(this.#theme?.list_item ?? 'todo-item'));

    const checkEl = document.createElement('input');
    checkEl.type = 'checkbox'
    checkEl.addEventListener('change', () => {
      const itemDoneClass = this.#theme?.list_itemDone ?? 'todo-item-done'
      if (itemDoneClass) itemEl.classList.toggle(itemDoneClass);

      const itemDoneTextClass = this.#theme?.list_item_textDone || ''
      if (itemDoneTextClass) textEl.classList.toggle(itemDoneTextClass);
    });
    checkEl.classList.add(...classUnify(this.#theme?.list_item_check ?? ''))

    const textEl = document.createElement('div');
    textEl.textContent = extText ? extText : this.#inputEl?.value ?? null
    textEl.classList.add(...classUnify(this.#theme?.list_item_text ?? 'todo-item-text'));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.addEventListener("click", () => {
      this.#listEl!.removeChild(itemEl);
    });
    deleteButton.classList.add(...classUnify(this.#theme?.list_item_deleteButton ?? ''))

    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.dataset.mode = "readonly";
    editButton.classList.add(...classUnify(this.#theme?.list_item_editButton ?? ''))

    let textEditEl: HTMLTextAreaElement;
    editButton.addEventListener("click", () => {
      if (editButton.dataset.mode === "readonly") {
        textEditEl = document.createElement("textarea")
        textEditEl.value = textEl.textContent ?? "";
        textEditEl.classList.add(...classUnify(this.#theme?.list_item_textEditInput ?? ''))
        checkEl.after(textEditEl);
        textEl.classList.add(...classUnify(this.#theme?.hidden ?? 'hidded'));
        deleteButton.disabled = true;
        editButton.dataset.mode = "editing";
        editButton.textContent = "Zapisz";
      } else {
        textEl.textContent = textEditEl.value;
        textEl.classList.remove(...classUnify(this.#theme?.hidden ?? 'hidded'));
        itemEl.removeChild(textEditEl);
        deleteButton.disabled = false;
        editButton.dataset.mode = "readonly";
        editButton.textContent = "Edytuj";
      }
    });

    itemEl.appendChild(checkEl)
    itemEl.appendChild(textEl)
    itemEl.appendChild(deleteButton)
    itemEl.appendChild(editButton)

    this.#inputEl.value = ''
    this.#listEl.appendChild(itemEl);
  }
}

function classUnify(classList: string) {
  if (!classList) return []
  return classList.split(' ');
}

export const TodoBoostrapTheme: TodoThemeSchema = {
  root: 'd-flex flex-column',
  list: 'list-group flex-grow-1 p-2',
  list_item: 'list-group-item d-flex',
  list_itemDone: '',
  list_item_check: 'form-check-input me-3',
  list_item_text: 'flex-grow-1 me-3',
  list_item_textDone: 'text-decoration-line-through',
  list_item_textEditInput: 'form-control me-3',
  list_item_deleteButton: 'btn btn-danger',
  list_item_editButton: 'btn btn-warning ms-1',
  footer: 'd-flex p-2',
  footer_input: 'form-control me-2',
  footer_addButton: 'btn btn-primary',
  hidden: 'd-none'
}

export const TodoBulmaTheme: TodoThemeSchema = {

  root: 'is-flex is-flex-direction-column',
  list: 'is-flex-grow-1 p-2',
  list_item: 'is-flex box is-align-items-center',
  list_itemDone: '',
  list_item_check: 'checkbox mr-3',
  list_item_text: 'is-flex-grow-1 mr-3',
  list_item_textDone: 'bulma-line-through',
  list_item_textEditInput: 'input mr-3',
  list_item_deleteButton: 'button is-danger',
  list_item_editButton: 'button is-warning ml-1',
  footer: 'is-flex p-2',
  footer_input: 'input mr-2',
  footer_addButton: 'button is-primary',
  hidden: 'is-hidden'
}

export const TodoFoundationTheme: TodoThemeSchema = {
  root: 'flex-dir-column flex-container',
  list: 'menu vertical flex-grow-1 p-2',
  list_item: 'menu-item flex-container',
  list_itemDone: '',
  list_item_check: 'input-checkbox margin-right-3',
  list_item_text: 'flex-grow-1 p-2 margin-right-3',
  list_item_textDone: 'foundation-line-through',
  list_item_textEditInput: 'input margin-right-3',
  list_item_deleteButton: 'button alert',
  list_item_editButton: 'button warning margin-left-1',
  footer: 'flex-container flex-dir-row align-middle p-2',
  footer_input: 'input margin-right-2',
  footer_addButton: 'button primary',
  hidden: 'hide'
}

export const TodoMaterializeTheme: TodoThemeSchema = {
  root: 'd-flex flex-column',
  list: 'collection flex-grow-1 p-2',
  list_item: 'collection-item d-flex align-items-center',
  list_itemDone: '',
  list_item_check: 'flex-grow-1 custom-checkbox',
  list_item_text: 'flex-grow-1 me-3',
  list_item_textDone: 'marterialize-line-through',
  list_item_textEditInput: 'input-field flex-grow-1 me-3',
  list_item_deleteButton: 'btn red',
  list_item_editButton: 'btn yellow darken-2 ms-1',
  footer: 'd-flex align-items-center p-2',
  footer_input: 'input-field flex-grow-1 me-2',
  footer_addButton: 'btn blue',
  hidden: 'hide'
}


interface TodoOptions {
  theme: TodoThemeSchema
}

interface TodoThemeSchema {
  root?: string,
  list?: string,
  list_item?: string,
  list_itemDone?: string,
  list_item_check?: string,
  list_item_text?: string,
  list_item_textDone?: string,
  list_item_textEditInput?: string,
  list_item_deleteButton?: string,
  list_item_editButton?: string,
  footer?: string,
  footer_input?: string,
  footer_addButton?: string,
  hidden?: string
}
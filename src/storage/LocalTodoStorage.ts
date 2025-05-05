import { TodoItem, TodoStorageProvider } from "../components/todo";

const STORAGE_KEY = "localStorage";

function getLocalStorage(): TodoItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLocalStorage(items: TodoItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export class LocalTodoStorage implements TodoStorageProvider {
  onItemsLoad() {
    return Promise.resolve(getLocalStorage());
  }

  onItemAdd(item: TodoItem) {
    const items = getLocalStorage();
    item.id = (items.reduce((max, i) => Math.max(max, i.id || 0), 0) || 0) + 1;
    items.push(item);
    saveLocalStorage(items);
    return Promise.resolve(item);
  }

  onItemUpdate(item: TodoItem) {
    const items = getLocalStorage();
    const index = items.findIndex(i => i.id === item.id);
    if (index > -1) items[index] = item;
    saveLocalStorage(items);
    return Promise.resolve(item);
  }

  onItemDelete(id: number) {
    let items = getLocalStorage();
    items = items.filter(i => i.id !== id);
    saveLocalStorage(items);
    return Promise.resolve();
  }
}
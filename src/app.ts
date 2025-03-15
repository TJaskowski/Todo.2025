import {TodoComponent,  putLog } from "./components/todo";

putLog("Hello from app.ts");

const todo = new TodoComponent();

const appEl = document.getElementById("app")!;

const wrapper = document.createElement("div");

appEl.appendChild(wrapper);

todo.mount(wrapper);
// if (wrapper) todo.mount(wrapper);
// else throw new Error("Wrapper not found");


/// <reference types="cypress" />

describe("Todo Local Storage Tests", () => {
  beforeEach(() => {
    // Visit the start page
    cy.visit("http://localhost:5173");
  });

  it("should add todo items and verify them in both UI and local storage", () => {
    // Clear local storage before each test
    cy.clearLocalStorage();

    // Click on LocalStorage option
    cy.contains("button", "LocalStorage").click();

    // Test data
    const todoItems = [
      "Learn Cypress framework fundamentals",
      "Write few tests",
      "Dive deeper into Cypress commands",
    ];

    // Add todo items through UI
    todoItems.forEach((item) => {
      cy.get("[data-testid=todo-input]").type(`${item}`);
      cy.get("[data-testid=todo-add-button]").click();
    });

    // Verify items in UI
    cy.get("[data-testid=todo-list] li").should(
      "have.length",
      todoItems.length
    );
    todoItems.forEach((item) => {
      cy.get("[data-testid=todo-list] li").should("contain", item);
    });

    // Verify items in local storage
    cy.window().then((w) => {
      const storage = JSON.parse(w.localStorage.getItem("todos"));
      expect(storage).to.have.length(todoItems.length);

      // Check if all items are in storage
      todoItems.forEach((item) => {
        const found = storage.some((todo) => todo.text === item);
        expect(found).to.be.true;
      });
    });
  });
  it("should correctly delete todo items and reflect changes in both UI and local storage", () => {
  // Clear local storage before each test
  cy.clearLocalStorage();
  cy.visit("http://localhost:5173");
  cy.contains("button", "LocalStorage").click();

  const todoItems = [
    "Learn Cypress framework fundamentals",
    "Write few tests",
    "Dive deeper into Cypress commands",
  ];

  // Add todo items through UI
  todoItems.forEach((item) => {
    cy.get("[data-testid=todo-input]").type(item);
    cy.get("[data-testid=todo-add-button]").click();
  });

  // Verify items in UI
  
  cy.get("[data-testid=todo-list] li").should("have.length", 3);

  // Delete the first item
  cy.contains("li", todoItems[0]).within(() => {
    cy.contains("Usuń").click();
  });

  // Verify that the first item is removed from the UI
  cy.get("[data-testid=todo-list] li").should("have.length", 2);
  cy.get("[data-testid=todo-list]").should("not.contain", todoItems[0]);

  // Verify that the first item is removed from local storage
  cy.window().then((win) => {
    const todos = JSON.parse(win.localStorage.getItem("todos"));
    expect(todos).to.have.length(2);
    expect(todos.some((item) => item.text === todoItems[0])).to.be.false;
  });

  // Delete the second item
  cy.contains("li", todoItems[1]).within(() => {
    cy.contains("Usuń").click();
  });

  cy.get("[data-testid=todo-list] li").should("have.length", 1);
  cy.get("[data-testid=todo-list]").should("not.contain", todoItems[1]);

  cy.window().then((win) => {
    const todos = JSON.parse(win.localStorage.getItem("todos"));
    expect(todos).to.have.length(1);
    expect(todos[0].text).to.equal(todoItems[2]);
  });

  // Delete the last item
  cy.contains("li", todoItems[2]).within(() => {
    cy.contains("Usuń").click();
  });

  cy.get("[data-testid=todo-list] li").should("have.length", 0);
  cy.get("[data-testid=todo-list]").should("not.contain", todoItems[2]);

  cy.window().then((win) => {
    const todos = JSON.parse(win.localStorage.getItem("todos"));
    expect(todos).to.have.length(0);
  });
});

});
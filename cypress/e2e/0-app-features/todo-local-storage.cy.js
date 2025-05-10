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
});

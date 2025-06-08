/// <reference types="cypress" />

describe("Todo Backend Storage Tests", () => {
  function clearList() {
    cy.get("body").then(($body) => {
      const items = $body.find("[data-testid=todo-list] li");
      if (items.length > 0) {
        cy.wrap(items).each(() => {
          cy.get("[data-testid=todo-list] li")
            .first()
            .within(() => {
              cy.contains("Usuń").click();
            });
        });
      }
    });
    cy.get("[data-testid=todo-list] li").should("have.length", 0);
  }

  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.contains("button", "Backend").click();
    cy.get("#username").type("user1");
    cy.get("#password").type("Pass123#");
    cy.get('button[type="submit"]').contains('Login').click();
    cy.wait(500);
    clearList();
  });

  it("should mark todo items as completed", () => {
    const text = "Todo should be marked as completed";
    cy.get("[data-testid=todo-input]").type(text);
    cy.get("[data-testid=todo-add-button]").click();

    cy.get("[data-testid=todo-list] li").should("have.length", 1);

    cy.get("[data-testid=todo-list] li").first().within(() => {
        cy.get('input[type="checkbox"]').check();
      });

    cy.get("[data-testid=todo-list] li").first().within(() => {
        cy.get('input[type="checkbox"]').should("be.checked");
      });

    cy.get("[data-testid=todo-list]", { timeout: 4000 }).should("exist");
    cy.get("[data-testid=todo-list] li", { timeout: 4000 }).first().within(() => {
        cy.get('input[type="checkbox"]').should("be.checked");
      });
  });

    it("should remove todo items from backend", () => {
    const items = [
        "First todo to remove", 
        "Second todo to remove", 
        "Third todo to remove"];
    items.forEach((item) => {
      cy.get("[data-testid=todo-input]").type(item);
      cy.get("[data-testid=todo-add-button]").click();
    });

    cy.get("[data-testid=todo-list] li").should("have.length", 3);

    cy.get("[data-testid=todo-list] li").first().within(() => {
        cy.contains("Usuń").click();
      });
    cy.get("[data-testid=todo-list] li").should("have.length", 2);
    cy.get("[data-testid=todo-list] li").should("contain", "Third todo to remove");
    cy.get("[data-testid=todo-list] li").should("contain", "Second todo to remove");

    cy.contains("[data-testid=todo-list] li", "Second todo to remove").contains("Usuń").click();
    cy.get("[data-testid=todo-list] li").should("have.length", 1);
    cy.get("[data-testid=todo-list] li").should("not.contain", "Second todo to remove");

    cy.get("[data-testid=todo-list] li").first().within(() => {
        cy.contains("Usuń").click();
      });
    cy.get("[data-testid=todo-list] li").should("have.length", 0);
 
    cy.get("[data-testid=todo-list]", { timeout: 4000 }).should("exist");
    cy.get("[data-testid=todo-list] li").should("have.length", 0);
  });

  it("should edit todo list text", () => {
    const text = "Text to edit";
    const editText = "Text after edit";
    cy.get("[data-testid=todo-input]").type(text);
    cy.get("[data-testid=todo-add-button]").click();

    cy.get("[data-testid=todo-list] li", { timeout: 4000 }).should("exist");
    cy.get("[data-testid=todo-list] li").should("contain", text);

    cy.get("[data-testid=todo-list] li").first().within(() => {
        cy.contains("Edytuj").click();
        cy.get("textarea").clear().type(editText);
        cy.contains("Zapisz").click();
      });

    cy.get("[data-testid=todo-list]", { timeout: 4000 }).should("exist");
    cy.get("[data-testid=todo-list] li", { timeout: 4000 }).should("contain", editText);
    cy.get("[data-testid=todo-list] li", { timeout: 4000 }).should("not.contain", text);
  });

  it("should not allow editing or checking a removed item after reload", () => {
  const text = "Temporary todo";

  cy.get("[data-testid=todo-input]").type(text);
  cy.get("[data-testid=todo-add-button]").click();

  cy.contains("[data-testid=todo-list] li", text).should("exist");

  cy.contains("[data-testid=todo-list] li", text).contains("Usuń").click();

  cy.get("[data-testid=todo-list] li").should("have.length", 0);

  cy.reload();
  cy.contains("button", "Backend").click();
    cy.get("#username").type("user1");
    cy.get("#password").type("Pass123#");
    cy.get('button[type="submit"]').contains('Login').click();
    cy.wait(500);

  cy.get("[data-testid=todo-list]").should("exist");
  cy.get("[data-testid=todo-list] li").should("not.exist");

  cy.contains("[data-testid=todo-list] li", text).should("not.exist");
});

});

describe("these tests check that the formity component works as expected", () => {
  it("should navigate to the appropiate steps and show the corresponding result", () => {
    cy.visit("http://localhost:3000/");

    function assertStep01() {
      cy.get("[data-cy='heading']").contains("Tell us about yourself");
      cy.get("[data-cy='description']").contains(
        "We would want to know a little bit more about you"
      );
      cy.get("[data-cy='field-name']");
      cy.get("[data-cy='field-surname']");
      cy.get("[data-cy='field-age']");
    }

    function assertStep02() {
      cy.get("[data-cy='heading']").contains("Are you a software developer?");
      cy.get("[data-cy='description']").contains(
        "We would like to know if you are a software developer"
      );
      cy.get("[data-cy='field-software-developer']");
    }

    function assertStep03() {
      cy.get("[data-cy='heading']").contains(
        "What are your favourite programming languages?"
      );
      cy.get("[data-cy='description']").contains(
        "We would like to know which of the following programming languages you like the most"
      );
      cy.get("[data-cy='field-languages']");
    }

    function assertStep04() {
      cy.get("[data-cy='heading']").contains(
        "What rating would you give to JavaScript?"
      );
      cy.get("[data-cy='description']").contains(
        "Since you said it is one of your favourite languages, we would like to know how much you like it"
      );
      cy.get("[data-cy='field-rating']");
    }

    function assertStep05() {
      cy.get("[data-cy='heading']").contains(
        "What rating would you give to Python?"
      );
      cy.get("[data-cy='description']").contains(
        "Since you said it is one of your favourite languages, we would like to know how much you like it"
      );
      cy.get("[data-cy='field-rating']");
    }

    function assertStep06() {
      cy.get("[data-cy='heading']").contains(
        "Would you be interested in learning how to code?"
      );
      cy.get("[data-cy='description']").contains(
        "Having coding skills can be very beneficial"
      );
      cy.get("[data-cy='field-interested']");
    }

    // Step 1
    assertStep01();
    cy.get("[data-cy='field-name']").type("John");
    cy.get("[data-cy='field-surname']").type("Doe");
    cy.get("[data-cy='field-age']").type("30");
    cy.get("[data-cy='next']").click();

    // Step 2
    assertStep02();
    cy.get("[data-cy='next']").click();

    // Step 3
    assertStep03();
    cy.get("[data-cy='field-languages']").contains("JavaScript").click();
    cy.get("[data-cy='field-languages']").contains("Python").click();
    cy.get("[data-cy='next']").click();

    // Step 4
    assertStep04();
    cy.get("[data-cy='field-rating']").contains("Like it a lot").click();
    cy.get("[data-cy='next']").click();

    // Step 5
    assertStep05();
    cy.get("[data-cy='field-rating']").contains("It's okay").click();
    cy.get("[data-cy='back']").click();

    // Step 4
    assertStep04();
    cy.get("[data-cy='back']").click();

    // Step 3
    assertStep03();
    cy.get("[data-cy='back']").click();

    // Step 2
    assertStep02();
    cy.get("[data-cy='field-software-developer']").contains("No").click();
    cy.get("[data-cy='next']").click();

    // Step 6
    assertStep06();
    cy.get("[data-cy='field-interested']").click();
    cy.contains("Yes, that sounds good.").click();
    cy.get("[data-cy='back']").click();

    // Step 2
    assertStep02();
    cy.get("[data-cy='field-software-developer']").contains("Yes").click();
    cy.get("[data-cy='next']").click();

    // Step 3
    assertStep03();
    cy.get("[data-cy='next']").click();

    // Step 4
    assertStep04();
    cy.get("[data-cy='next']").click();
  });

  it("should show the appropiate error messages", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='next']").click();
    cy.get("[data-cy='field-name']").contains("Required");
    cy.get("[data-cy='field-surname']").contains("Required");
    cy.get("[data-cy='field-name']").type(Array<string>(21).fill("a").join(""));
    cy.get("[data-cy='field-name']").contains("Max 20 chars");
    cy.get("[data-cy='field-surname']").type(Array(21).fill("a").join(""));
    cy.get("[data-cy='field-surname']").contains("Max 20 chars");
    cy.get("[data-cy='field-age']").type("9");
    cy.get("[data-cy='field-age']").contains("Min. 10");
    cy.get("[data-cy='field-age']").type("99");
    cy.get("[data-cy='field-age']").contains("Max. 99");
    cy.get("[data-cy='field-name']").type(
      Array(21).fill("{backspace}").join("")
    );
    cy.get("[data-cy='field-surname']").type(
      Array(21).fill("{backspace}").join("")
    );
    cy.get("[data-cy='field-age']").type("{backspace}{backspace}{backspace}");
    cy.get("[data-cy='field-name']").type("John");
    cy.get("[data-cy='field-surname']").type("Doe");
    cy.get("[data-cy='field-age']").type("30");
    cy.get("[data-cy='next']").click();

    cy.get("[data-cy='heading']").contains("Are you a software developer?");
  });
});

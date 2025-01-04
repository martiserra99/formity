describe("Formity", () => {
  it("renders the multi-step form with the initial state", () => {
    cy.visit("http://localhost:3000/");
  });

  it("initializes the form with the passed initial state", () => {});

  it("navigates to the next steps of the multi-step form", () => {});

  it("navigates to the previous steps of the multi-step form", () => {});

  it("initializes the values of the multi-step form with the passed inputs", () => {});

  it("generates values every time the multi-step form encounters variables", () => {});

  it("generates values from the current form when navigating to the next step", () => {});

  it("uses the parameters that are provided when rendering the multi-step form", () => {});

  it("saves the values previously introduced in each form of the multi-step form", () => {});

  it("doesn't navigate to any next form if the current form is the last one", () => {});

  it("doesn't navigate to any next form if there is a return before the next one", () => {});

  it("doesn't navigate to any previous form if the current form is the first one", () => {});

  it("invokes the onYield callback function every time the multi-step form yields values", () => {});

  it("invokes the onReturn callback function when the multi-step form returns values", () => {});
});

describe("Flow control structure", () => {
  describe("List", () => {
    it("navigates to the next steps of the multi-step form", () => {});

    it("saves the values previously introduced in each form of the multi-step form", () => {});
  });

  describe("Cond", () => {
    it("navigates to the next steps of the multi-step form", () => {});

    it("saves the values previously introduced in each form of the multi-step form", () => {});
  });

  describe("Loop", () => {
    it("navigates to the next steps of the multi-step form", () => {});

    it("saves the values previously introduced in each form of the multi-step form", () => {});
  });

  describe("Switch", () => {
    it("navigates to the next steps of the multi-step form", () => {});

    it("saves the values previously introduced in each form of the multi-step form", () => {});
  });
});

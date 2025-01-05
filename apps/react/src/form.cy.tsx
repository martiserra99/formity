import Form from "./form";

import { mainSchema, MainValues } from "./form.cy.schemas";

describe("<Formity />", () => {
  it("renders the multi-step form with the initial state", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("initializes the form with the passed initial state", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates to the next steps of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates to the previous steps of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("saves the values previously introduced in each form of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("invokes the onYield callback function every time the multi-step form yields values", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("invokes the onReturn callback function when the multi-step form returns values", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates to the next steps within a list of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates to the next steps within a condition of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates to the next steps within a loop of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates to the next steps within a switch of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });
});

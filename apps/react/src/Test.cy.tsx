import Test from "./Test";

describe("<Test />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Test />);
  });
});

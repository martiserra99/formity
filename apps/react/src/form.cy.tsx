import Form from "./form";

import {
  mainSchema,
  MainValues,
  listSchema,
  ListValues,
} from "./form.cy.schemas";

describe("<Formity />", () => {
  it("renders the multi-step form with the initial state", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
    cy.get("[data-cy=heading]").should("have.text", "Tell us about yourself");
  });

  it("initializes the form with the passed initial state", () => {
    cy.mount(
      <Form<MainValues>
        schema={mainSchema}
        initialFlow={{
          cursors: [
            {
              path: [
                {
                  type: "list",
                  slot: 0,
                },
              ],
              values: {},
            },
            {
              path: [
                {
                  type: "list",
                  slot: 2,
                },
              ],
              values: {
                name: "Marti",
                surname: "Serra",
                age: 25,
              },
            },
            {
              path: [
                {
                  type: "list",
                  slot: 4,
                },
                {
                  type: "cond",
                  path: "else",
                  slot: 0,
                },
              ],
              values: {
                name: "Marti",
                surname: "Serra",
                age: 25,
                softwareDeveloper: false,
              },
            },
          ],
          entries: {
            type: "list",
            list: {
              "0": {
                name: {
                  data: {
                    here: true,
                    data: "Marti",
                  },
                  keys: {},
                },
                surname: {
                  data: {
                    here: true,
                    data: "Serra",
                  },
                  keys: {},
                },
                age: {
                  data: {
                    here: true,
                    data: 25,
                  },
                  keys: {},
                },
              },
              "2": {
                softwareDeveloper: {
                  data: {
                    here: true,
                    data: false,
                  },
                  keys: {},
                },
              },
              "4": {
                type: "cond",
                then: {},
                else: {
                  "0": {
                    interested: {
                      data: {
                        here: true,
                        data: "yes",
                      },
                      keys: {},
                    },
                  },
                },
              },
            },
          },
        }}
      />
    );
    cy.get("[data-cy=heading]").should(
      "have.text",
      "Would you be interested in learning how to code?"
    );
  });

  it("navigates to the next steps of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
    cy.get("[data-cy=heading]").should("have.text", "Tell us about yourself");
    cy.get("[data-cy=input]").eq(0).type("John");
    cy.get("[data-cy=input]").eq(1).type("Doe");
    cy.get("[data-cy=input]").eq(2).type("{backspace}5");
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "Are you a software developer?"
    );
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "What are your favourite programming languages?"
    );
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "What rating would you give to JavaScript?"
    );
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "What rating would you give to Python?"
    );
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
  });

  it("invokes the onYield callback function every time the multi-step form yields values", () => {
    const onYieldSpy = cy.spy().as("onYieldSpy");
    cy.mount(<Form<MainValues> schema={mainSchema} onYield={onYieldSpy} />);
    cy.get("[data-cy=input]").eq(0).type("John");
    cy.get("[data-cy=input]").eq(1).type("Doe");
    cy.get("[data-cy=input]").eq(2).type("{backspace}5");
    cy.get("[data-cy=button]").click();
    cy.get("@onYieldSpy").should("have.been.calledWith", {
      name: "John",
      surname: "Doe",
      age: 25,
    });
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("@onYieldSpy").should("have.been.calledWith", {
      softwareDeveloper: true,
    });
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
    cy.get("@onYieldSpy").should("have.been.calledWith", {
      languages: ["javascript", "python"],
    });
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("@onYieldSpy").should("have.been.calledWith", {
      rating: "love-it",
    });
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
    cy.get("@onYieldSpy").should("have.been.calledWith", {
      rating: "like-it-a-lot",
    });
  });

  it("invokes the onReturn callback function when the multi-step form returns values", () => {
    const onReturn = cy.spy().as("onReturn");
    cy.mount(<Form<MainValues> schema={mainSchema} onReturn={onReturn} />);
    cy.get("[data-cy=input]").eq(0).type("John");
    cy.get("[data-cy=input]").eq(1).type("Doe");
    cy.get("[data-cy=input]").eq(2).type("{backspace}5");
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
    cy.get("@onReturn").should("have.been.calledWith", {
      fullName: "John Doe",
      age: 25,
      softwareDeveloper: true,
      languages: [
        {
          name: "javascript",
          rating: "love-it",
        },
        {
          name: "python",
          rating: "like-it-a-lot",
        },
      ],
    });
  });

  it("navigates to the previous steps of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
    cy.get("[data-cy=input]").eq(0).type("John");
    cy.get("[data-cy=input]").eq(1).type("Doe");
    cy.get("[data-cy=input]").eq(2).type("{backspace}5");
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "What rating would you give to Python?"
    );
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "What rating would you give to JavaScript?"
    );
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "What are your favourite programming languages?"
    );
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=heading]").should(
      "have.text",
      "Are you a software developer?"
    );
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=heading]").should("have.text", "Tell us about yourself");
  });

  it("saves the values previously introduced in each form of the multi-step form", () => {
    const onReturn = cy.spy().as("onReturn");
    cy.mount(<Form<MainValues> schema={mainSchema} onReturn={onReturn} />);
    cy.get("[data-cy=input]").eq(0).type("John");
    cy.get("[data-cy=input]").eq(1).type("Doe");
    cy.get("[data-cy=input]").eq(2).type("{backspace}5");
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(0).click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=input]").eq(1).click();
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=back]").click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=button]").click();
    cy.get("@onReturn").should("have.been.calledWith", {
      fullName: "John Doe",
      age: 25,
      softwareDeveloper: true,
      languages: [
        {
          name: "javascript",
          rating: "love-it",
        },
        {
          name: "python",
          rating: "like-it-a-lot",
        },
      ],
    });
  });

  it("navigates through steps in a list of the multi-step form until it reaches a return", () => {
    const onReturn = cy.spy().as("onReturn");
    cy.mount(<Form<ListValues> schema={listSchema} onReturn={onReturn} />);
    cy.get("[data-cy=heading]").should("have.text", "Tell us your name");
    cy.get("[data-cy=input]").eq(0).type("John");
    cy.get("[data-cy=input]").eq(1).type("Doe");
    cy.get("[data-cy=button]").click();
    cy.get("@onReturn").should("have.been.calledWith", {
      fullName: "John Doe",
    });
  });

  it("navigates through steps in a condition of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates through steps in a loop of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });

  it("navigates through steps in a switch flow of the multi-step form", () => {
    cy.mount(<Form<MainValues> schema={mainSchema} />);
  });
});

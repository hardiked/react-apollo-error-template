import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App, { REGISTER } from "../App";

describe("#App", () => {
  it("renders", async () => {
    const mocks = [
      {
        request: {
          query: REGISTER,
          variables: {
            input: {
              email: "test@gmail.com",
            },
          },
        },
        result: {
          data: {
            register: {
              error: [{ message: "email is use", path: "email" }],
              __typename: "Error",
            },
          },
        },
      },
    ];
    const { getByTestId, getByText, debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    // testing any query also fails here

    // wait for query to get resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // get the button to click
    const button = getByText("Click me");
    fireEvent.click(button);

    // wait for mutation to get resolve
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});

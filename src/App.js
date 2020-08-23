import React from "react";
import { gql, useMutation } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ... on Error {
        error {
          path
          message
        }
      }
      ... on User {
        email
        username
      }
    }
  }
`;

export default function App() {
  const [mutate, { loading: mutationLoading, error }] = useMutation(REGISTER);
  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      <button
        onClick={async () => {
          const { data } = await mutate({
            variables: {
              input: { email: "hmodi@2457@gmail.com" },
            },
          });
          console.log(data);
        }}
      >
        Click me
      </button>
    </main>
  );
}

import { gql } from "@urql/next";
export const SigninMutation = gql`
  mutation Signin($data: AuthInput!) {
    signin(input: $data) {
      id
      token
    }
  }
`;

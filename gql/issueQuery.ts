import { gql } from "@urql/next";

export const IssuesQuery = gql`
  query Query {
    issues {
      id
      name
      status
    }
  }
`;

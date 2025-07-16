import { gql } from "@urql/next";

export const EditIssueMutation = gql`
  mutation editIssueMutation($input: EditIssueInput!) {
    editIssue(input: $input) {
      content
      id
      name
      status
    }
  }
`;

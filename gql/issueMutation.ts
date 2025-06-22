import { gql } from "@urql/next";

export const IssueMutation = gql`
  mutation Mutation($data: CreateIssueInput!) {
    createIssue(input: $data) {
      id
      createdAt
    }
  }
`;

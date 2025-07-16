import { gql } from "@urql/next";

export const CreateIssueMutation = gql`
  mutation Mutation($data: CreateIssueInput!) {
    createIssue(input: $data) {
      id
      createdAt
    }
  }
`;

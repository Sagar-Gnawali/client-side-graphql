import { gql } from "@apollo/client";

export const DeleteIssueMutation = gql`
  mutation Mutation($deleteIssueId: ID!) {
    deleteIssue(id: $deleteIssueId)
  }
`;

# 🚀 Client-side GraphQL in Next.js using URQL

This project demonstrates how to integrate **URQL** in a **Next.js** app to perform client-side GraphQL operations like `CreateIssue`, `EditIssue`, and `DeleteIssue`.

> **URQL** is a highly customizable and versatile GraphQL client. It emphasizes usability for newcomers while supporting advanced use cases like normalized caching and custom exchanges as your application grows.

---

## 📦 Features

- 🔧 URQL client setup with `@urql/next`
- 🚀 GraphQL Mutations (`CreateIssue`, `EditIssue`, `DeleteIssue`)
- ✅ Client-side GraphQL operations using hooks
- 🔄 Mutation state handling (success, error, loading)

---

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/)
- [URQL](https://formidable.com/open-source/urql/)
- [GraphQL](https://graphql.org/)

---

## Create Mutation

```javascript
const CreateIssueMutation = gql`
  mutation Mutation($data: CreateIssueInput!) {
    createIssue(input: $data) {
      id
      createdAt
    }
  }
`;
```

## Query

```javascript
const IssuesQuery = gql`
  query Query {
    issues {
      id
      name
      status
    }
  }
`;
```

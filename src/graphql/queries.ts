
export const GET_USER_TODOS_QUERY = `
  query GetUserTodos($userId: ID!) {
    todos(where: { user: {id: $userID} }) {
      id
      title
      completed
      description
      duedate
    }
  }
`;
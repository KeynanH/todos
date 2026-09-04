export const GET_USER_BY_EMAIL = `
  query getUserByEmail($email: String!){
    hygraphUser: authModel(where: {email: $email}){
      id
      email
      password
    }
  }
`
export const GET_USER_TODOS_QUERY = `
  query GetUserTodos($userID: ID!) {
    todos(where: { authModel: { id: $userID } }) {
      id
      title
      completed
      description
      dueDate
    }
  }
`;
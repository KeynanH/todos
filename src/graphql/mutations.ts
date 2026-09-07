export const CREATE_USER_MUTATION = `
  mutation CreateUser($email: String!, $password: String!) {
    createAuthModel(data: {email: $email, password: $password}) {
      id
      email
      password
    }
    publishAuthModel(where: {email: $email}, to: [PUBLISHED]) {
      id
    }
  }
`

export const CREATE_TODO_MUTATION = `
  mutation CreateTodo(
    $title: String!
    $userID: ID!
    $completed: Boolean!
    $description: String
    $dueDate: DateTime
  ) {
    createTodo(
      data: {
        title: $title
        completed: $completed
        description: $description
        dueDate: $dueDate
        authModel: { connect: { id: $userID } }
      }
    ) {
      id
      title
    }
    publishTodo(where: { title: $title }, to: [PUBLISHED]) {
      id
    }
  }
`;


export const UPDATE_TODO_MUTATION = `
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(
      where: { id: $id }
      data: { completed: $completed }
    ) {
      id  
      completed
    }
    publishTodo(where: { id: $id }, to: [PUBLISHED]) {
      id
    }
  }
`;

export const DELETE_TODO_MUTATION = `
  mutation DeleteTodo($id: ID!) {
    unpublishTodo(where: { id: $id }, from: [PUBLISHED]) {
      id
    }
    deleteTodo(where: {id: $id}) {
      id
    }
  }
`;
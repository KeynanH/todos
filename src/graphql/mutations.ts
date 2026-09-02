export const CREATE_TODO_MUTUATION = `
  mutation CreateTodo(
    $title: String!,
    $userID: ID!,
    $completed: Boolean!
    $description: String
    $dueDate: Date
  ) {
    createTodo(
      data: {
        title: $title,
        completed: $completed,
        user: {connect: { id: $userId}}
      }
    ) {
    id
    title
    completed
    description
    dueDate 
}
}`
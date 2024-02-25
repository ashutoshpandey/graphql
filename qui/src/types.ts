export type Todo = {
  id: number,
  title: string,
  description: string
  completed: boolean
}

export type TodoState = {
  mutation: 'CREATED' | 'UPDATED' | 'DELETED',
  data: Todo
}
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { Todo, TodoState } from 'src/types';

const GET_TODOS = gql`{
  getTodos {
    id
    title
    description
    completed
  }
}
`

const ADD_TODO = gql`
  mutation AddTodo($title: String!, $description: String!) {
    addTodo(title: $title, description: $description) {
      id
      title
      description
      completed
    }
  }
`

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $title: String, $description: String, $completed: Boolean) {
    updateTodo(id: $id, title: $title, description: $description, completed: $completed) {
      id
      title
      description
      completed
    }
  }
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
      title
      description
      completed
    }
  }
`

const TODO_SUBSCRIBE = gql`
  subscription {
    todo {
      mutation
      data {
        id
        title
        description
        completed
      }
  }
}`

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private apollo: Apollo) {}

  getTodos(){
    return this.apollo.query({
      query: GET_TODOS
    })
  }

  addTodo(title: string, description: string) {
    return this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        title,
        description
      }
    })
  }

  updateTodo(id: number, title?: string, description?: string) {
    return this.apollo.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id,
        title,
        description,
      }
    })
  }

  completeTodo(id: number, completed: boolean) {
    return this.apollo.mutate({
      mutation: UPDATE_TODO,
      variables: {
        id,
        completed
      }
    })
  }

  deleteTodo(id: number) {
    return this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id
      }
    })
  }

  subscribeToTodo() {
    return this.apollo.subscribe({
      query: TODO_SUBSCRIBE,
    })
  }

  updateTodosState(todos: Todo[], todoState: TodoState) {
    const newTodos = todos.map(todo => todo)
    let todoIndex = newTodos.findIndex(todo => todo.id === todoState.data.id)
    switch(todoState.mutation) {
      case 'CREATED':
        newTodos.unshift(todoState.data)
        return newTodos
      case 'UPDATED':
        newTodos[todoIndex] = todoState.data;
        return newTodos
      case 'DELETED':
        newTodos.splice(todoIndex, 1);
        return newTodos
    }
  }
}

import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from 'src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAddModalOpen = false; 
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  openAddModal() {
    this.isAddModalOpen = true
  }

  handleAddModalClose() {
    this.isAddModalOpen = false
  } 
 
  ngOnInit(): void {
     this.todoService.subscribeToTodo().subscribe((result: any) => {
      if(result.data.todo) {
        const newTodos = this.todoService.updateTodosState(this.todos, result.data.todo)
        this.todos = newTodos
      }
    })
    this.todoService.getTodos().subscribe((result:any) => {
      this.todos = result.data.getTodos
    })
  }
}
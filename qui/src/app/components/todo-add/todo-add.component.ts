import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css', '../shared-form-styles.css']
})
export class TodoAddComponent implements OnInit {

  @Input() onClose!: () => void;
  title: string = "";
  description: string = "";

  constructor(private todoService: TodoService) { }

  addTodo(event: Event){
    event.preventDefault();
    this.todoService.addTodo(this.title, this.description).subscribe(() => this.onClose())
  } 

  ngOnInit(): void {
  }

}

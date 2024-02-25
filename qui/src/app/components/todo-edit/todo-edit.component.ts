import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css',  '../shared-form-styles.css']
})
export class TodoEditComponent implements OnInit {

  @Input() onClose!: () => void;
  @Input() title!: string;
  @Input() description!: string;
  @Input() id!: number;

  constructor(private todoService: TodoService) { }

  editTodo(event: Event){
    event.preventDefault();
    this.todoService.updateTodo(this.id, this.title, this.description).subscribe(() => this.onClose())
  }

  ngOnInit(): void {

  }

}

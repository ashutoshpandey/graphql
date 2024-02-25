import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {

  @Input() onClose!: () => void;
  @Input() title!: string;
  @Input() description?: string;

  constructor() { }

  ngOnInit(): void {
  }

}

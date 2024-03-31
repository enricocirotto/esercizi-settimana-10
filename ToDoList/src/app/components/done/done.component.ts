import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/interfaces/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  todos$!: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.todo.subscribe((data) => {
      this.todos$ = data
    })
  }
}
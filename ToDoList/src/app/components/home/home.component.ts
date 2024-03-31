import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo.interface';
import { User } from 'src/app/interfaces/user.interface';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todos$!: Todo[]; 
  users$!: User[];

  constructor (private todoService: TodoService, private userService: UserService) {}

  ngOnInit(): void {
    this.todoService.todo.subscribe((data) => {
      this.todos$ = data
    })
    this.userService.getUsers().then((data) => {
      this.users$ = data;
    });
  }

  getName(userId: number): string {
    const user = this.users$.find(user => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  toggleCompleted(todo: Todo) {
    let index = this.todos$.findIndex((value) => value.id == todo.id)
    if (index !== -1) {
      todo.completed = !todo.completed;
      this.todoService.toggleComplete(todo)
    }
  }
  
}

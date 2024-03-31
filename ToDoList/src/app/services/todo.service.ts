import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  todoUrl = 'assets/data/db.todo.json'
  _todo: Todo[] = [];
  todo: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {
    this.getTodos().then(data => {
      this._todo = data;
      this.todo.next(this._todo);
    });
  }

  async getTodos(): Promise<Todo[]> {
    let response = await fetch('assets/data/db.todo.json');
    let data = await response.json();
    
    return data as Todo[];
  }


  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl);
  }

  toggleComplete(todo:Todo) {
    let index = this._todo.findIndex((value) => value.id == todo.id)
    if (index >= 0) {
      this._todo[index] = todo;
      this.todo.next(this._todo)
    }
  }
}

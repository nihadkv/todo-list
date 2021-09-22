import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  createTask(task: TodoModel) {
    return this.http.post('http://localhost:3333/api/todo', { title: task });
  }

  findTask() {
    return this.http.get('http://localhost:3333/api/todo');
  }

  deleteTask(id: TodoModel) {
    console.log(id);
    return this.http.delete(`http://localhost:3333/api/todo/${id}`);
  }
}

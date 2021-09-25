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

  findAllTask() {
    return this.http.get('http://localhost:3333/api/todo');
  }

  findTask(id: TodoModel) {
    return this.http.get(`http://localhost:3333/api/todo/${id}`);
  }

  deleteTask(id: TodoModel) {
    return this.http.delete(`http://localhost:3333/api/todo/${id}`);
  }

  editTask(id: TodoModel, updatedTask: TodoModel) {
    return this.http.put(`http://localhost:3333/api/todo/${id}`, {
      title: updatedTask,
    });
  }
}

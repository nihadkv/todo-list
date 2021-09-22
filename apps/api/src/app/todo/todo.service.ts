import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './models/todo.entity';
import { TodoModel } from './models/todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoEntity: Repository<TodoEntity>
  ) {}
  createTask(task: TodoModel) {
    // console.log(task)
    return this.todoEntity.save(task);
  }

  getTask() {
    return this.todoEntity.find();
  }

  updateTask(id: number, task: TodoModel) {
    return this.todoEntity.update(id, task);
  }

  deleteTask(id: number) {
    return this.todoEntity.delete(id);
  }
}

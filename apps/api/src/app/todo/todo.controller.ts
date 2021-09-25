import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoModel } from './models/todo.model';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  create(@Body() title: TodoModel) {
    return this.todoService.createTask(title);
  }

  @Get()
  findAll() {
    return this.todoService.getAllTask();
  }

  @Get(':id')
  findTask(@Param() id: TodoModel) {
    console.log(id);
    return this.todoService.getTask(id);
  }

  @Put(':id')
  update(@Param() id: number, @Body() task: TodoModel) {
    return this.todoService.updateTask(id, task);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.todoService.deleteTask(id);
  }
}

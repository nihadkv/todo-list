import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  formGroup!: FormGroup;
  // tasks: TodoModel[] = [];
  tasks$: Observable<TodoModel> | any;
  isEdit = false;
  editId!: any;
  refreshUsers$ = new BehaviorSubject<boolean>(true);
  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      task: [''],
    });
    this.getAllData();
  }

  getAllData() {
    this.tasks$ = this.todoService.findAllTask();
  }

  addTask() {
    if (this.formGroup.value.task) {
      this.todoService
        .createTask(this.formGroup.get('task')?.value)
        .subscribe();
      this.formGroup.reset();
    }
    setTimeout(() => {
      this.getAllData();
    }, 100);
  }

  deleteTask(id: TodoModel) {
    this.todoService.deleteTask(id).subscribe();
    setTimeout(() => {
      this.getAllData();
    }, 100);
  }

  editTask(id: TodoModel) {
    this.todoService.findTask(id).subscribe((res: any) => {
      this.formGroup.patchValue({ task: res[0].title });
    });
    this.isEdit = true;
    this.editId = id;
  }

  updateTask() {
    const updatedTask = this.formGroup.value.task;
    this.todoService.editTask(this.editId, updatedTask).subscribe();
    this.formGroup.reset();
    this.isEdit = false;
    setTimeout(() => {
      this.getAllData();
    }, 100);
  }
}

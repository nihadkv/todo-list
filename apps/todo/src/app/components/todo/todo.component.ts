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
  index!: number;
  refreshUsers$ = new BehaviorSubject<boolean>(true);
  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      task: [''],
    });
    this.getData();
  }

  getData() {
    // this.todoService.findTask().subscribe((res) => {
    //   console.log(res);
    //   this.tasks$ = res;
    // });
    this.tasks$ = this.todoService.findTask();
  }

  addTask() {
    if (this.formGroup.value.task) {
      // this.tasks.push(this.formGroup.get('task')?.value);
      this.todoService
        .createTask(this.formGroup.get('task')?.value)
        .subscribe();
      this.formGroup.reset();
    }
    this.getData();
  }

  deleteTask(id: TodoModel) {
    // console.log(id);
    // this.tasks.splice(i, 1);
    this.todoService.deleteTask(id).subscribe();
    this.getData();
  }

  editTask(i: number) {
    this.index = i;
    // const indexValue = this.tasks[i];
    // this.formGroup.patchValue({ task: indexValue });
    this.isEdit = true;
  }

  updateTask() {
    // this.tasks[this.index] = this.formGroup.value.task;
    this.formGroup.reset();
    this.isEdit = false;
  }
}

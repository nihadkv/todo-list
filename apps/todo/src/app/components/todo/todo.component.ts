import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'todo-app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  formGroup!: FormGroup;
  tasks: TodoModel[] = [];
  isEdit = false;
  index!: number;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      task: [''],
    });
  }

  addTask() {
    if (this.formGroup.value.task) {
      this.tasks.push(this.formGroup.get('task')?.value);
      this.formGroup.reset();
    }
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  editTask(i: number) {
    this.index = i;
    const indexValue = this.tasks[i];
    this.formGroup.patchValue({ task: indexValue });
    this.isEdit = true;
  }

  updateTask() {
    this.tasks[this.index] = this.formGroup.value.task;
    this.formGroup.reset();
    this.isEdit = false;
  }
}

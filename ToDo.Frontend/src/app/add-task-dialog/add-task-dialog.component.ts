import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { TaskService } from '../Services/task.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.css'
})
export class AddTaskDialogComponent {
  addTaskForm: FormGroup;
  projectId = this.route.snapshot.paramMap.get('id');

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private ref: DynamicDialogRef,
    private route: ActivatedRoute
  ) {
    this.addTaskForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onCancel() {
    this.ref.close();
  }

  addTask() {
    const taskData = {
      description: this.addTaskForm.value.description,
      projectId: this.projectId,
    }
    if (this.projectId != null) {
      this.taskService.addTask(taskData).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
    this.ref.close();
  }
}

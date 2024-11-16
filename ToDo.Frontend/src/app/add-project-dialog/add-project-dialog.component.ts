import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ProjectService } from '../Services/project.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule 
  ]
})
export class AddProjectDialogComponent {
  addProjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private ref: DynamicDialogRef
  ) {
    this.addProjectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onCancel() {
    this.ref.close();
  }

  addProject() {
    const projectData = {
      title: this.addProjectForm.value.title,
    }
    this.projectService.addProject(projectData).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    this.ref.close();
  }
}

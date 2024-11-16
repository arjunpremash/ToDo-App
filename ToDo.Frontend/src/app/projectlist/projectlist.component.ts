import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../Models/project';
import { ProjectService } from '../Services/project.service';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-projectlist',
  standalone: true,
  imports: [CardModule,
    DatePipe,
    CommonModule,
    HttpClientModule,
    ButtonModule
  ],
  providers: [DialogService],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.css'
})

export class ProjectlistComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (data) => (this.projects = data, console.log(data)),
      (error) => console.error('Error fetching projects', error)
    );
  }

  openAddProjectDialog() {
    const ref = this.dialogService.open(AddProjectDialogComponent, {
      header: "Add Project",
      width: '300px',
      //closable: false,
    })

    ref.onClose.subscribe(res => {
      window.location.reload();
    })
  }

  deleteProject(projectId: any) {
    console.log(projectId);
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe(
        res => {
          console.log(res);
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}

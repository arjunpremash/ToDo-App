import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../Models/project';
import { ProjectService } from '../Services/project.service';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { AddProjectDialogComponent } from '../add-project-dialog/add-project-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-projectlist',
  standalone: true,
  imports: [CardModule,
    DatePipe,
    CommonModule,
    ButtonModule
  ],
  providers: [DialogService],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.css'
})

export class ProjectlistComponent implements OnInit {
  projects: Project[] = [];
  userId: number | null = Number(localStorage.getItem('userId'));


  constructor(
    private router: Router,
    private projectService: ProjectService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    if (this.userId != null) {
      this.projectService.getProjects(this.userId).subscribe(
        (data) => (this.projects = data, console.log(data)),
        (error) => console.error('Error fetching projects', error)
      );
    }

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

  viewProjectDetails(projectId: number): void {
    this.router.navigate(['/project', projectId]);
  }

}

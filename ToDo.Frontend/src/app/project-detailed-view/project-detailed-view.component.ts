import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TaskService } from '../Services/task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectService } from '../Services/project.service';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-project-detailed-view',
  standalone: true,
  imports: [
    CardModule,
    DatePipe,
    MessagesModule,
    CommonModule,
    ToolbarModule,
    ButtonModule
  ],
  providers: [DialogService],
  templateUrl: './project-detailed-view.component.html',
  styleUrl: './project-detailed-view.component.css'
})
export class ProjectDetailedViewComponent implements OnInit{
  project: any;
  allTasks: any;
  pendingTasks: any;
  completedTasks: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private dialogService: DialogService
  ){}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if(projectId){
      this.projectService.getProjectById(projectId).subscribe({
        next: res => {
          this.project = res;
        },
        error: err => {
          console.log(err);
        }
      })
      this.taskService.getTasks(projectId).subscribe({
        next: res => {
          this.allTasks = res;
          this.updateTaskLists();
          console.log(res);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  updateTaskLists(): void {
    if (this.allTasks) {
      this.pendingTasks = this.allTasks.filter((task: any) => !task.isCompleted);
      this.completedTasks = this.allTasks.filter((task: any) => task.isCompleted);
    }
  }

  toggleTaskStatus(task: any){
    this.taskService.toggleTaskStatus(task.todoId).subscribe({
      next: res => {
        console.log(res);
        task.isCompleted = !task.isCompleted;
        this.updateTaskLists();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  openAddTaskDialog() {
    const ref = this.dialogService.open(AddTaskDialogComponent, {
      header: "Add New Task",
      width: '300px',
      //closable: false,
    })

    ref.onClose.subscribe(res => {
      window.location.reload();
    })
  } 

}

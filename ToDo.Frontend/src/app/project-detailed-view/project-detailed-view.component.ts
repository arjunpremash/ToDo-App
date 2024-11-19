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
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import { GistService } from '../Services/gist.service';
import { DialogModule } from 'primeng/dialog';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-project-detailed-view',
  standalone: true,
  imports: [
    CardModule,
    DatePipe,
    MessagesModule,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
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
  isEditingTitle: boolean = false;
  editedTitle: string = '';
  exportDialogVisible: boolean = false;
  showTokenInput: boolean = false;
  githubToken: string = '';
  gistUrl: string = '';
  displayClipboardDialog: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private dialogService: DialogService,
    private gistService: GistService,
    private clipboard: Clipboard
  ){}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.fetchProjectDetails(projectId);
    
  }

  fetchProjectDetails(projectId: any){
    if(projectId){
      this.projectService.getProjectById(projectId).subscribe({
        next: res => {
          this.project = res;
          this.editedTitle = this.project.title;
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

  startEditingTitle() {
    this.isEditingTitle = true;
  }

  saveTitle(){
    if (this.editedTitle.trim() !== this.project.title) {
      const projectData = {
        projectId: this.project.projectId,
        title: this.editedTitle.trim(),
      }
      this.projectService.updateProject(projectData).subscribe({
        next: () => {
          this.project.title = this.editedTitle;
          this.isEditingTitle = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.isEditingTitle = false; // No change in title
    }
  }

  cancelEditingTitle() {
    this.isEditingTitle = false;
    this.editedTitle = this.project.title;
  }

  editTask(task: any) {
    task.isEditing = true;
  }

  saveTask(task: any) {
    this.taskService.updateTask(task).subscribe(updatedTask => {
      task.isEditing = false;
      this.fetchProjectDetails(this.project.projectId);
    });
  }

  cancelEdit(task: any) {
    task.isEditing = false;
    //this.fetchProjectDetails(this.project.projectId); // Re-fetch the project details to cancel edits
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task.todoId).subscribe(() => {
      this.fetchProjectDetails(this.project.projectId); // Reload project after deletion
    });
  }

  generateMarkdown(): string {
    const title = this.project?.title || 'Untitled';
    const completedCount = this.completedTasks.length;
    const totalCount = this.completedTasks.length + this.pendingTasks.length;
  
    const pendingTasks = this.pendingTasks
      .map((task: { description: any; }) => `- [ ] ${task.description}`)
      .join('\n');
  
    const completedTasks = this.completedTasks
      .map((task: { description: any; }) => `- [x] ${task.description}`)
      .join('\n');
  
    return `# ${title}\n\n## Summary\n${completedCount} / ${totalCount} completed.\n\n## Pending Tasks\n${pendingTasks || 'None'}\n\n## Completed Tasks\n${completedTasks || 'None'}`;
  }

  openExportDialog() {
    this.exportDialogVisible = true;
  }

  exportAsMarkdown() {
    const markdownContent = this.generateMarkdown();
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${this.project.title}.md`);
    this.exportDialogVisible = false;
  }

  showGithubTokenField() {
    this.showTokenInput = true;
  }

  exportToGist() {
    if (!this.githubToken) {
      alert('Please provide a GitHub token.');
      return;
    }

    const markdownContent = this.generateMarkdown();
    this.gistService.createGist(this.githubToken, this.project.title, markdownContent).then(response => {
      console.log(response);
      this.gistUrl = response.html_url;
      this.exportDialogVisible = false;
      this.displayClipboardDialog = true;
    })
    .catch(error => {
      console.error('Error creating Gist', error);
    });;
    this.githubToken = '';
    this.showTokenInput = false;
  }

  closeExportDialog(){
    this.exportDialogVisible = false;
    this.githubToken = '';
    this.showTokenInput = false;

  }

  copyToClipboard() {
    this.clipboard.copy(this.gistUrl);
  }

  closeClipBoardDialog(){
    this.displayClipboardDialog = false;
    this.gistUrl = '';
  }

}

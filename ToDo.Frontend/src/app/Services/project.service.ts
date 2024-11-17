import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://localhost:7124/api/Project';

  constructor(private http: HttpClient) { }

  getProjects(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/${userId}`);
  }

  getProjectById(projectId: any){
    return this.http.get<Project>(`${this.apiUrl}?projectId=${projectId}`);
  }

  addProject(userId: number, projectData: any){
    return this.http.post(`${this.apiUrl}/${userId}`, projectData, {
      headers: { 'Content-Type': 'application/json' }
    });
  } 

  deleteProject(projectId: any){
    return this.http.delete(this.apiUrl+`/${projectId}`);
  }
}

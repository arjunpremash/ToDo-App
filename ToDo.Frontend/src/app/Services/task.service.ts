import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseApiUrl = 'https://localhost:7124/api/Todo';

  constructor(private httpClient: HttpClient) { }

  getTasks(projectId: any){
    return this.httpClient.get(`${this.baseApiUrl}?projectId=${projectId}`);
  }

  addTask(task: any){
    return this.httpClient.post(this.baseApiUrl, task);
  }
}

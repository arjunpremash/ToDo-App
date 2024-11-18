import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private apiUrl = 'https://api.github.com/gists';
  private token = '';

  constructor(private http: HttpClient) { }

  createGist(token: string, fileName: string, content: string): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const body = {
      description: 'Exported Project Gist',
      public: false,
      files: {
        [fileName]: { content },
      },
    };

    return this.http.post(this.apiUrl, body, { headers }).toPromise();
  }
}

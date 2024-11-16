import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7124/api/User/login'

  constructor(private httpClient: HttpClient) { }

  login(user: any): Observable<any>{
    return this.httpClient.post(this.apiUrl, user);
  }
}

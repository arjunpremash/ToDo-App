import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7124/api/User'
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: any): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/login`, user)
    .pipe(
      tap((response : any)=> {
        localStorage.setItem('userid', response.user.userId);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  signup(user: any){
    return this.httpClient.post(`${this.apiUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('userid');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  
  checkLoginStatus(): boolean {
    return !!localStorage.getItem('userid');
  }
}

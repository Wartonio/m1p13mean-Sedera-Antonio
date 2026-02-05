import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './conf/env';
import { ResponseAuth } from '../model/responseAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  login(user: any): Observable<any> {
    return this.http.post<ResponseAuth>(`${this.apiUrl}/auth/login`, user).pipe(
      tap((response: ResponseAuth) => {
        console.log("value of isLogged ->",response)
        this.isLoggedInSubject.next(true);
      })
    );
  } 
  
  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }
}
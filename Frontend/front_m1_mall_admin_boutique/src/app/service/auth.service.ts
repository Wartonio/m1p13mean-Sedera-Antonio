import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './conf/env';
import { ResponseAuth } from '../model/responseAuth';
import { User } from '../model/user';

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
        this.saveToken(response.token);
        this.isLoggedInSubject.next(true);
      })
    );
  } 

  insertDefaultUser(util: User) : Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/auth/signup`,util); 
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
    localStorage.removeItem('jwtToken'); // Vide tout
    this.isLoggedInSubject.next(false); // Update l'UI
    this.router.navigate(['/login']); // Redirige
  }

}
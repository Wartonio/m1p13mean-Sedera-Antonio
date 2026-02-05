import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './conf/env';
import { AuthService } from './auth.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  token:String | null=null;
  
  constructor(private http: HttpClient,private authService:AuthService) {}

//   getUserSelected(id : number) : Observable<User>{
//     return this.http.get<User>(`${this.apiUrl}/user/${id}`,this.getHttpOptions());
//   }

//   getUserConnected(): Observable<User>{
//     this.token = this.authService.getToken(); 
//     return this.http.get<User>(`${this.apiUrl}/user/connected/${this.token}`, this.getHttpOptions());
//   }
  
//   countUserActive(): Observable<number>{ 
//     return this.http.get<number>(`${this.apiUrl}/user/count-user`, this.getHttpOptions());
//   }
  
//   countUserActiveResp(id: number): Observable<number>{ 
//     return this.http.get<number>(`${this.apiUrl}/user/count-user-resp/${id}`, this.getHttpOptions());
//   }

//   getListUsers(page: number, size: number,critere: string) : Observable<any>{
//     let params = new HttpParams()
//         .append('page', page.toString())
//         .append('size', size.toString());
//     return this.http.get<User[]>(`${this.apiUrl}/user?critere=${critere}`,{params,...this.getHttpOptions()});
//   }

  getListUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/user/all`,this.getHttpOptions());
  }

  changeStatus( id:string,newStatus:string) : Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/user/disable/${id}?status=${newStatus}`,null,this.getHttpOptions());
  }

//   getUserNotInTeam(critere : string) : Observable<User[]>{
//     return this.http.get<User[]>(`${this.apiUrl}/user/noInTeam?critere=${critere}`,this.getHttpOptions());
//   }

//   getUserByResp(id:number,critere : string) : Observable<User[]>{
//     return this.http.get<User[]>(`${this.apiUrl}/user/user-resp/${id}?critere=${critere}`,this.getHttpOptions());
//   }

//   insertDefaultUser(util: User) : Observable<void>{
//     return this.http.post<void>(`${this.apiUrl}/user/default`,util,this.getHttpOptions()); 
//   }

//   insertUser(util: User) : Observable<void>{
//     return this.http.post<void>(`${this.apiUrl}/user`,util,this.getHttpOptions());
//   }

//   updateUser(util: User) : Observable<void>{
//     return this.http.put<void>(`${this.apiUrl}/user`,util,this.getHttpOptions());
//   }
  
//   reinitialisePwd(id: number , newPassword: string) : Observable<void>{
//     return this.http.put<void>(`${this.apiUrl}/user/reinitialise/${id}?newPwd=${newPassword}`,null,this.getHttpOptions());
//   }

//   deleteUser(id : number) : Observable<void>{
//     return this.http.put<void>(`${this.apiUrl}/user/${id}`,null,this.getHttpOptions());
//   }

  private getHttpOptions() {
        const token = localStorage.getItem('jwtToken');
        return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
        };
    }
}
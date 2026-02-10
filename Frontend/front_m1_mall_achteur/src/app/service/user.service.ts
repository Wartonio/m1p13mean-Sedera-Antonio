import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './conf/env';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  token:String | null=null;
  
  constructor(private http: HttpClient) {}

  getListUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/user/all`,this.getHttpOptions());
  }

  getUsers(page: number, limit: number, search: string): Observable<any> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search: search
    };
    return this.http.get(`${this.apiUrl}/user/pagination`, { params,...this.getHttpOptions()});
  }

  changeStatus( id:string,newStatus:string) : Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/user/disable/${id}?status=${newStatus}`,null,this.getHttpOptions());
  }

  getOne(id: string) : Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/one/${id}`,this.getHttpOptions());
  }
  
  insertUser(util: User) : Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/user/insert`,util,this.getHttpOptions());
  }
  
  updateUser(util: User) : Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/user/update`,util,this.getHttpOptions());
  }
  
  getMe() : Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/me`,this.getHttpOptions());
  }


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
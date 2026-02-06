import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './conf/env';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl;
  token:String | null=null;

  constructor(private http: HttpClient) {}

  getListRoles() : Observable<Role[]>{
    return this.http.get<Role[]>(`${this.apiUrl}/role/all`,this.getHttpOptions());
  }

  getOne(id: string) : Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/role/one/${id}`,this.getHttpOptions());
  }
  
  insertRole(util: Role) : Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/role/insert`,util,this.getHttpOptions());
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
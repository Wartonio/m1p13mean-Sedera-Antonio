import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './conf/env';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;
  token:String | null=null;

  constructor(private http: HttpClient) {}

  getListCategorys() : Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}/category/all`,this.getHttpOptions());
  }

  getOne(id: string) : Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/category/one/${id}`,this.getHttpOptions());
  }
  
  insertCategory(util: Category) : Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/category/insert`,util,this.getHttpOptions());
  }
  
  updateCategory(util: Category) : Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/category/update`,util,this.getHttpOptions());
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from './conf/env';
import { Shop } from '../model/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = environment.apiUrl;
  token:String | null=null;
  
  constructor(private http: HttpClient) {}

  getListShops() : Observable<Shop[]>{
    return this.http.get<Shop[]>(`${this.apiUrl}/shop/all`,this.getHttpOptions());
  }

  getShops(page: number, limit: number, search: string): Observable<any> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      search: search
    };
    return this.http.get(`${this.apiUrl}/shop/pagination`, { params,...this.getHttpOptions()});
  }

  changeStatus( id:string,newStatus:string) : Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/shop/disable/${id}?status=${newStatus}`,null,this.getHttpOptions());
  }

  getOne(id: string) : Observable<Shop> {
    return this.http.get<Shop>(`${this.apiUrl}/shop/one/${id}`,this.getHttpOptions());
  }
  
  insertShop(util: Shop) : Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/shop/insert`,util,this.getHttpOptions());
  }
  
  updateShop(util: Shop) : Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/shop/update`,util,this.getHttpOptions());
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
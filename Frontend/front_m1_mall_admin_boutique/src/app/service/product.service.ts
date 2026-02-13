import { Injectable } from '@angular/core';
import { environment } from './conf/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListproduct(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/product/all`,this.getHttpOptions());
  }

  getproductbyshop(shopid: string):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/shop/${shopid}`,this.getHttpOptions());
  }

  insertproduct(Util: Product): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/product/insertproduct`,Util,this.getHttpOptions());
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

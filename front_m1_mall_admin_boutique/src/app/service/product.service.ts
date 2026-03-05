import { Injectable } from '@angular/core';
import { environment } from './conf/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { PaginatedProducts } from '../model/PaginatedProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    updateShop(util: Product) : Observable<void>{
      return this.http.patch<void>(`${this.apiUrl}/product/update`,util,this.getHttpOptions());
    }

  getListproduct(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/product/all`,this.getHttpOptions());
  }

  getproductbyshop(shopid: string):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/shops/${shopid}`,this.getHttpOptions());
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/One/${id}`);
  }

  getProductByShoppage(
    shopid: string,
    page: number,
    limit: number
  ): Observable<PaginatedProducts> {

    return this.http.get<PaginatedProducts>(
      `${this.apiUrl}/product/shop/${shopid}?page=${page}&limit=${limit}`,
      this.getHttpOptions()
    );
  }

  insertproduct(Util: Product): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/product/insertproduct`,Util,this.getHttpOptions());
  }

  insertproductimage(formData: FormData): Observable<any>{
    return this.http.post(`${this.apiUrl}/product/insertproduct`,formData,this.getHttpFormOptions());
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

  private getHttpFormOptions() {
      const token = localStorage.getItem('jwtToken');
      return {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
        })
      };
  }
}

import { Injectable } from '@angular/core';
import { environment } from './conf/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';
import { Stocks } from '../model/stocks';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListStock(): Observable<Stock[]> {
  return this.http.get<Stock[]>(
    `${this.apiUrl}/stock/all`,
    this.getHttpOptions()
  );
  }

  insertstockproduct(Util: Stocks): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/stock/insertstock`,Util,this.getHttpOptions());
  }

  getstockproductbyshop(shopid: string):Observable<Stock[]> {
      return this.http.get<Stock[]>(`${this.apiUrl}/stock/${shopid}`,this.getHttpOptions());
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

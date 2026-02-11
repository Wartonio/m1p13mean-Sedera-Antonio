import { Injectable } from '@angular/core';
import { environment } from './conf/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';

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

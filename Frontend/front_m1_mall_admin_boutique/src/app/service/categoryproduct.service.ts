import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './conf/env';
import { Categoryproduct } from '../model/categoryproduct';

@Injectable({
  providedIn: 'root'
})
export class CategoryproductService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getListcategorieproduct():Observable<Categoryproduct[]>{
    return this.http.get<Categoryproduct[]>(`${this.apiUrl}/categoryproduct/all`,this.getHttpOptions());

  }

  insertcategoryproduct(Util: Categoryproduct): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/categoryproduct/insertcategoryproduct`,Util,this.getHttpOptions());
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

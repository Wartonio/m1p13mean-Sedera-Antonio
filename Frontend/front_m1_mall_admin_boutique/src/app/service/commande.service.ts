import { Injectable } from '@angular/core';
import { environment } from './conf/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListcommande(): Observable<Commande[]>{
    return this.http.get<Commande[]>(`${this.apiUrl}/commande/all`,this.getHttpOptions());
  }

  getcommandebyshop(shopid: string):Observable<Commande[]> {
      return this.http.get<Commande[]>(`${this.apiUrl}/commande/${shopid}`,this.getHttpOptions());
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from './conf/env';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }

  addToCart(product: any) {
    const current = this.cartItems.value;
    this.cartItems.next([...current, product]);
  }

  getCount() {
    return this.cartItems.value.length;
  }

  // À ajouter dans CartService si ce n'est pas fait
  updateCart(items: any[]) {
    this.cartItems.next(items);
  }

  insertCommande(data: any) {
  return this.http.post<any>(
    `${this.apiUrl}/commande/insertcommande`,
    data,
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
  
      private getAuthHeader() {
      const token = localStorage.getItem('jwtToken');
      return {
          headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
          })
      };
  }
}
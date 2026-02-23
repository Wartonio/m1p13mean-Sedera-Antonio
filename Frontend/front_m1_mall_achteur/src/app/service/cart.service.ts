import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

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
}
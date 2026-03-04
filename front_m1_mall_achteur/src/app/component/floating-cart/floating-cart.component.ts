import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service'; // Ajustez le chemin selon votre structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-cart',
  templateUrl: './floating-cart.component.html',
  styleUrls: ['./floating-cart.component.css']
})
export class FloatingCartComponent implements OnInit {
  
  cartCount: number = 0;

  constructor(private cartService: CartService,private router : Router) { }

  ngOnInit(): void {
    // On s'abonne à l'observable pour recevoir les mises à jour
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });
  }

  toggleCart() {
    this.router.navigate(['cart-details']);
  }
}
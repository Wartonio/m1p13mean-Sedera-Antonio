import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // On s'abonne aux changements du panier
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  removeItem(index: number) {
    // On retire l'élément localement
    this.cartItems.splice(index, 1);
    // On met à jour le service pour que le badge du panier flottant s'actualise aussi
    this.cartService.updateCart(this.cartItems);
  }

  goBack() {
    this.router.navigate(['/shop']);
  }

  checkout() {
    if(this.cartItems.length > 0) {
      alert('Merci pour votre commande de ' + this.totalPrice + ' Ar !');
    }
  }
}
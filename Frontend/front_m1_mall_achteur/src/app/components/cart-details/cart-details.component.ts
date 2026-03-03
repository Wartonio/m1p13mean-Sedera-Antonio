import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

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
    private router: Router,private userservice: UserService
  ) {}

  user!: User;

 getMe(): void {
  this.userservice.getMe().subscribe({
    next: (data: User) => {
      this.user = data;
      console.log('Utilisateur connecté :', this.user);
    },
    error: (err) => {
      console.error('Erreur lors de la récupération du user', err);
    }
  });
}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {

      // 🔥 Sécurise quantity si elle n'existe pas
      items.forEach(item => {
        if (!item.quantity) {
          item.quantity = 1;
        }
      });

      this.cartItems = items;
      this.calculateTotal();
    });

    this.getMe();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) =>
        acc + ((item.price || 0) * (item.quantity || 1)),
      0
    );
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
    this.cartService.updateCart(this.cartItems);
    this.calculateTotal();
  }

  decreaseQuantity(index: number): void {

    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    } else {
      this.cartItems.splice(index, 1);
    }

    this.cartService.updateCart(this.cartItems);
    this.calculateTotal();
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.cartService.updateCart(this.cartItems);
    this.calculateTotal();
  }

  goBack(): void {
    this.router.navigate(['/shop']);
  }

checkout(): void {

  if (this.cartItems.length === 0) return;

  if (!this.user || !this.user._id) {
    alert("Utilisateur non connecté");
    return;
  }

  this.cartItems.forEach(item => {

    const commandeData = {
      product: item._id,
      typelivraison: "Livraison",
      quantity: item.quantity,
      pricetotal: item.price * item.quantity,
      shop: item.shop,
      user: this.user._id
    };

    this.cartService.insertCommande(commandeData).subscribe({
      next: (res) => {
        console.log("Commande créée :", res.reference);
      },
      error: (err) => {
        console.error(err);
      }
    });

  });

  alert("Commandes envoyées avec succès !");
  this.cartService.updateCart([]);
  this.router.navigate(['/shop']);
}


}
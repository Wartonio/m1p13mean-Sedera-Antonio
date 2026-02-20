import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shopName: string;
  category: string;
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  id = 0;
  product : Product | null = null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id']; // Le '+' convertit la string en number
      if (productId) {
        this.product = this.products.find(p => p.id === productId) || null;

        if (!this.product) {
          this.router.navigate(['/product']);
        }
      }
    });
  }
  
  
  constructor(
    private cartService : CartService,
    private router : Router,    
    private route: ActivatedRoute,
    private location: Location
  ){}
  
  products: Product[] = [
    {
      id: 1,
      name: 'Sneakers Air Max',
      price: 125000, // Ar ou € selon votre monnaie
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop',
      shopName: 'Sport Plaza',
      category: 'Chaussures'
    },
    {
      id: 2,
      name: 'Montre Quartz Minimaliste',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop',
      shopName: 'Luxury Time',
      category: 'Accessoires'
    },
    {
      id: 3,
      name: 'Casque Audio Bluetooth',
      price: 210000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop',
      shopName: 'Tech Hub',
      category: 'Électronique'
    },
    {
      id: 4,
      name: 'Sac à dos Urbain',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop',
      shopName: 'Mode & Style',
      category: 'Sacs'
    }
  ];

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      // Optionnel: Notification de succès ici
    }
  }

  redirectBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/shop']); // Chemin par défaut si aucun historique
    }
  }
}

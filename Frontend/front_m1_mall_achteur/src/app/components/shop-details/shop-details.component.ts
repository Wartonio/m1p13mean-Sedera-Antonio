import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
interface Shop {
  id: number;
  name: string;
  image: string;
  location: string;    // Nouvelle propriété
  category: string;    // Secteur d'activité
  description: string; // Petit texte d'accroche
}
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  shopName: string;
  category: string;
}
@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent {
  id = 0;
  shop : Shop | null = null;
  productShop : Product []=[];

  constructor(
    private cartService : CartService,
    private router : Router,
    private route : ActivatedRoute
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const shopId = +params['id']; 
      if (shopId) {
        // 1. Trouver la boutique correspondante
        this.shop = this.shops.find(s => s.id === shopId) || null;
        
        // 2. Filtrer les produits appartenant à cette boutique
        if (this.shop) {
          this.productShop = this.products.filter(p => p.shopName === this.shop?.name);
        } else {
          this.router.navigate(['/shop']);
        }
      }
    });
  }

  shops: Shop[] = [
    {
      id: 1,
      name: 'Sport Plaza',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500&auto=format&fit=crop',
      location: 'Analakely, Pavillon 12',
      category: 'Sport & Loisirs',
      description: 'Le meilleur de l\'équipement sportif en plein cœur de la ville.'
    },
    {
      id: 2,
      name: 'Luxury Time',
      image: 'https://images.unsplash.com/photo-1524143820251-40994026363c?q=80&w=500&auto=format&fit=crop',
      location: 'Ivandry, Galerie Smart',
      category: 'Horlogerie',
      description: 'Montres de luxe et accessoires de haute précision.'
    },
    {
      id: 3,
      name: 'Tech Hub',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500&auto=format&fit=crop',
      location: 'Ankorondrano, Zone TBE',
      category: 'Électronique',
      description: 'Gadgets high-tech et matériel informatique dernière génération.'
    },
    {
      id: 4,
      name: 'Mode & Style',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=500&auto=format&fit=crop',
      location: 'Andraharo, Immeuble City',
      category: 'Prêt-à-porter',
      description: 'Vêtements tendance pour hommes et femmes.'
    }
  ];

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

  redirectBack(){
    this.router.navigate(['shop']);
  }

  detailsProduct(id : number){
    this.router.navigate(['product-details',id]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Produit ajouté :', product.name);
  }
}

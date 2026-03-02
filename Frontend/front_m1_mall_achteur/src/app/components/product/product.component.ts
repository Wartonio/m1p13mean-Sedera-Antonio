import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product[]=[];

  ngOnInit(){
      this.getAllproduct();
  }

  constructor(
    private cartService : CartService,
    private router : Router,
    private productservice: ProductService,
    private userservice :UserService
  ){}

  // products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Sneakers Air Max',
  //     price: 125000, // Ar ou € selon votre monnaie
  //     image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500&auto=format&fit=crop',
  //     shopName: 'Sport Plaza',
  //     category: 'Chaussures'
  //   },
  //   {
  //     id: 2,
  //     name: 'Montre Quartz Minimaliste',
  //     price: 85000,
  //     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop',
  //     shopName: 'Luxury Time',
  //     category: 'Accessoires'
  //   },
  //   {
  //     id: 3,
  //     name: 'Casque Audio Bluetooth',
  //     price: 210000,
  //     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop',
  //     shopName: 'Tech Hub',
  //     category: 'Électronique'
  //   },
  //   {
  //     id: 4,
  //     name: 'Sac à dos Urbain',
  //     price: 45000,
  //     image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop',
  //     shopName: 'Mode & Style',
  //     category: 'Sacs'
  //   }
  // ];

  viewDetails(id : string) {
    this.router.navigate(['product-details',id])
  }
  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);
  //   console.log('Produit ajouté :', product.name);
  //   // Logique pour ajouter au panier
  // }

    getAllproduct(){
    this.productservice.getListproduct().subscribe(
      (data : Product[])=>{
        this.product =data;
      console.log(data);
      }
    )
  }







}

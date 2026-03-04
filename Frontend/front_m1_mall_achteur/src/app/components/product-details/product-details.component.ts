import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { environment } from '../env/config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  loading = true;
  product?: Product;


    apiUrl = environment.apiUrl;

 ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }


  constructor(
    private cartService : CartService,
    private router : Router,
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ){}



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

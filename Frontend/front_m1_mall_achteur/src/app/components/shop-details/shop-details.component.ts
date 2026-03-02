import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
interface Shop {
  id: number;
  name: string;
  image: string;
  location: string;    // Nouvelle propriété
  category: string;    // Secteur d'activité
  description: string; // Petit texte d'accroche
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
  product: Product[]=[];

  constructor(
    private cartService : CartService,
    private router : Router,
    private route : ActivatedRoute,
    private productService: ProductService
  ){}

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     const shopId = +params['id']; 
  //     if (shopId) {
  //       // 1. Trouver la boutique correspondante
  //       this.shop = this.shops.find(s => s.id === shopId) || null;
        
  //       // 2. Filtrer les produits appartenant à cette boutique
  //       if (this.shop) {
  //         this.productShop = this.products.filter(p => p.shopName === this.shop?.name);
  //       } else {
  //         this.router.navigate(['/shop']);
  //       }
  //     }
  //   });
  // }


  loading = true;

// getProductsByShop(shopId: string): void {
//   this.loading = true;

//   this.productService.getproductbyshop(shopId).subscribe({
//     next: (data) => {
//       this.product = data;
//       this.loading = false;
//     },
//     error: (err) => {
//       console.error(err);
//       this.loading = false;
//     }
//   });
// }

  ngOnInit(): void {
    // Récupérer shopId depuis l'URL et appeler la fonction externe
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const shopId = params.get('shopId');
          if (shopId) {
            return this.getProductsByShop(shopId); // fonction qui retourne un Observable
          }
          console.warn('Shop ID absent dans l’URL');
          return of([]); // renvoyer un Observable vide si pas de shopId
        })
      )
      .subscribe({
        next: (data: Product[]) => {
          this.product = data;
        },
        error: err => {
          console.error('Erreur lors du chargement des produits :', err);
        }
      });
  }

  // Fonction externe pour récupérer les produits
  getProductsByShop(shopId: string) {
    this.loading = true;
    return this.productService.getproductbyshop(shopId).pipe(
      switchMap((data: Product[]) => {
        this.loading = false;
        return of(data); // retourne les données au subscribe
      }),
      // en cas d'erreur, on gère le loading et on renvoie Observable vide
      // pour éviter que le stream plante
      catchError(err => {
        console.error(err);
        this.loading = false;
        return of([]);
      })
    );
  }


  redirectBack(){
    this.router.navigate(['shop']);
  }

  detailsProduct(id : number){
    this.router.navigate(['product-details',id]);
  }

  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);
  //   console.log('Produit ajouté :', product.name);
  // }
}

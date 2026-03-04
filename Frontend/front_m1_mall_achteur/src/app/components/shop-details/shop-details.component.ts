import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Shop } from 'src/app/model/shop';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { ShopService } from 'src/app/service/shop.service';
import { environment } from '../env/config';


@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent {
  shop?: Shop;
  product: Product[]=[];

  apiUrl = environment.apiUrl;

  constructor(
    private cartService : CartService,
    private router : Router,
    private route : ActivatedRoute,
    private productService: ProductService,
    private shopservice: ShopService
  ){}




  loading = true;


  ngOnInit(): void {
    // Récupérer shopId depuis l'URL et appeler la fonction externe
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const shopId = params.get('id');
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

      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.shopservice.getOne(id).subscribe({
          next: (data) => {
            this.shop = data;
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      }
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

  viewDetails(id : string){
    this.router.navigate(['product-details',id]);
  }



  // addToCart(product: Product) {
  //   this.cartService.addToCart(product);
  //   console.log('Produit ajouté :', product.name);
  // }
}

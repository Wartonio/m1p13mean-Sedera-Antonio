import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { Product } from 'src/app/model/product';
import { Shop } from 'src/app/model/shop';
import { User } from 'src/app/model/user';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import { ProductService } from 'src/app/service/product.service';
import { ShopService } from 'src/app/service/shop.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './editproduct.component.html',
  styleUrl: './editproduct.component.css'
})
export class EditproductComponent {
//   id='';
//   product = {
//     _id: '',
//     designation: '',
//     reference: '',
//     category: '',
//     description: '',
//     status: '',
//     image: '',
//     price: 0
// };


//   categoryproduct : Categoryproduct[]=[];
//   isLoading =false;

//   constructor(
//     private shopService : ShopService,
//     private categoryproductservice : CategoryproductService,
//     private router : Router,
//     private route : ActivatedRoute,
//     private productservice: ProductService
//   ){}

//    ngOnInit(){
//     this.route.params.subscribe(params => {
//       this.id = params['id'];
//       if (this.id) {
//         this.loadCategorySelected();
//       }
//     });
//     this.loadsCat();
//   }
  
//     loadsCat(){
//     this.categoryproductservice.getListcategorieproduct().subscribe(
//       (data : Categoryproduct[])=>{
//         this.categoryproduct =data;
//       }
//     )
//   }

//     loadCategorySelected(){
//     if (!this.id) {
//       return;
//     }
//     this.productservice.getProductById(this.id).subscribe({
//       next: (o : Product) => {
//         this.product ={
//           _id: o._id,
//           designation: o.designation ?? '',
//           category: o.category ?? '',
//           reference: o.reference ?? '',
//           description: o.description ?? '',
//           status: o.status ?? '',
//           price: o.price ?? 0,
//           image: o.image ?? '' 
//         };
//       },
//       error: () => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Erreur',
//           text: 'Une erreur est survenue lors de la collectte, veuillez réessayer'
//         });
//       }
//     });
//   }

//   update(){
//     this.productservice.updateShop(this.product).subscribe({
//       next: () => {
//         this.redirectBack();
//         Swal.fire({
//           icon: 'success',
//           title: 'Succès',
//           text: `Shop mis à jour`,
//           timer: 1500,
//           showConfirmButton: false
//         }); 
//       },
//       error: () => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Erreur',
//           text: 'Une erreur est survenue, veuillez réessayer'
//         });
//       }
//     })
//   }

//   redirectBack(): void{
//     this.router.navigate(['/shop-list']);
//   }


  id = '';
  product!: Product;
  categoryproduct: Categoryproduct[] = [];
  isLoading = false;

  constructor(
    private categoryproductservice: CategoryproductService,
    private router: Router,
    private route: ActivatedRoute,
    private productservice: ProductService,
    private userservice: UserService
    
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadProduct();
      }
    });

    
    this.getcategoryproductbyshop(); 
  }

  user!: User; 
  getcategoryproductbyshop(){
         this.userservice.getMe().pipe(
        switchMap((user: User) => {
          this.user = user;
    
          const shopId = user._id; 
    
          return this.categoryproductservice.getproductbyshop(shopId);
        })
        ).subscribe(
        (categoryproducts) => {
          console.log("Categories:", categoryproducts);
          this.categoryproduct = categoryproducts;
        },
        (error) => {
          console.error(error);
        }
      );
  }

   getmed(){ 
    this.userservice.getMe().subscribe( (data: User) =>
       { this.user = data; } ); 
  }

  loadProduct() {
    this.productservice.getProductById(this.id).subscribe({
      next: (data: Product) => {
        this.product = data;
      },
      error: () => {
        Swal.fire('Erreur', 'Impossible de charger le produit', 'error');
      }
    });
  }

  update() {
    this.productservice.updateShop(this.product).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Produit mis à jour',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/Listproduct']);
      },
      error: () => {
        Swal.fire('Erreur', 'Mise à jour échouée', 'error');
      }
    });
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from '../../env/config';

@Component({
  selector: 'app-listproduit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listproduit.component.html',
  styleUrl: './listproduit.component.css'
})
export class ListproduitComponent {

  product: Product[]=[];
  user!: User;

  ngOnInit(){
    this.getproductbyshoppage();
    this.getmed();
  }

  constructor(private router: Router,private productservice: ProductService, private userservice :UserService){}
  
  // getAllproduct(){
  //   this.productservice.getListproduct().subscribe(
  //     (data : Product[])=>{
  //       this.product =data;
  //     }
  //   )
  // }

  

  getproductbyshop(){
     this.userservice.getMe().pipe(
    switchMap((user: User) => {
      this.user = user;

      const shopId = user._id; 

      return this.productservice.getproductbyshop(shopId);
    })
    ).subscribe(
    (products) => {
      this.product = products;
    },
    (error) => {
      console.error(error);
    }
  );
  }



currentPage = 1;
totalPages = 0;
limit = 5; // nombre de produits par page

getproductbyshoppage() {
  this.userservice.getMe().pipe(
    switchMap((user: User) => {
      this.user = user;
      const shopId = user._id;

      // Appel au service avec pagination
      return this.productservice.getProductByShoppage(
        shopId,
        this.currentPage,
        this.limit
      );
    })
  ).subscribe(
    (res) => {
      this.product = res.data;        // tableau de produits
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
    },
    (error) => {
      console.error(error);
    }
  );
}

// Pagination
nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.getproductbyshop();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getproductbyshop();
  }
}



  getmed(){
  this.userservice.getMe().subscribe(
    (data: User) => {
      this.user = data;
      
    }
  );
  }


  addproduct(): void {
    this.router.navigate(['/addproduct']);
  }

  editCategory(id : string): void {
    this.router.navigate(['/prod-edit',id]);
  }

  apiUrl = environment.apiUrl;

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

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
    this.getproductbyshop();
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

}

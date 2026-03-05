import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from '../env/config';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product[]=[];

  apiUrl = environment.apiUrl;

  ngOnInit(){
      this.getAllproduct();
  }

  constructor(
    private cartService : CartService,
    private router : Router,
    private productservice: ProductService,
    private userservice :UserService
  ){}


  viewDetails(id : string) {
    this.router.navigate(['product-details',id])
  }


    getAllproduct(){
    this.productservice.getListproduct().subscribe(
      (data : Product[])=>{
        this.product =data;
      console.log(data);
      }
    )
  }

  addToCart(product : Product) {
    if (product) {
      this.cartService.addToCart(this.product);
      // Optionnel: Notification de succès ici
    }
  }
}

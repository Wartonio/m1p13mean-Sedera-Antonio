import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-listproduit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listproduit.component.html',
  styleUrl: './listproduit.component.css'
})
export class ListproduitComponent {

  product: Product[]=[];

  ngOnInit(){
    this.getAllproduct();
  }

  constructor(private router: Router,private productservice: ProductService){}
  
  getAllproduct(){
    this.productservice.getListproduct().subscribe(
      (data : Product[])=>{
        this.product =data;
      }
    )
  }

  addproduct(): void {
    this.router.navigate(['/addproduct']);
  }

}

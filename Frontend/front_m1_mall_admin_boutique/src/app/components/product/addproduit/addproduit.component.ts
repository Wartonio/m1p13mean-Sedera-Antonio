import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './addproduit.component.html',
  styleUrl: './addproduit.component.css'
})
export class AddproduitComponent {
  product={
    _id: '',
    designation: '',
    reference:'',
    category:'',
    description:'',
    price:0,
    status:'',
    image:''
  };
  isLoading = false;

  categoryproduct : Categoryproduct[]=[];

  constructor(private router: Router,private productservice: ProductService,private categoryproductservice: CategoryproductService){}

  ngOnInit(){
    this.getAllcategoryproduct();  
  }
  insertproduct():void{
    this.isLoading =true;
    this.productservice.insertproduct(this.product).subscribe({
      next:() =>{
        this.redirectBack();
        Swal.fire({
                  icon: 'success',
                  title: 'Succès',
                  text: `Catégorie inserer avec succès`,
                  timer: 1500,
                  showConfirmButton: false
        }); 
      },
      error:()=>{
        Swal.fire({
                  icon: 'error',
                  title: 'Erreur',
                  text: 'Une erreur est survenue, veuillez réessayer'         
        });
      }
    });
  }

  getAllcategoryproduct(){
      this.categoryproductservice.getListcategorieproduct().subscribe(
        (data : Categoryproduct[])=>{
          this.categoryproduct = data;
        }
      )
    }

  redirectBack(): void{
    this.router.navigate(['/Listproduct']);
  }
}

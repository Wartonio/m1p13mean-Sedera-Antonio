import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategoryproduit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addcategoryproduit.component.html',
  styleUrl: './addcategoryproduit.component.css'
})
export class AddcategoryproduitComponent {
  categorieproduct={
    _id : '',
    ref : '',
    designation : ''
  };
  isLoading = false;
  constructor(private categoryproductservice: CategoryproductService, private router : Router){}

  insertcategoryproduct(): void{
    this.isLoading = true;
    this.categoryproductservice.insertcategoryproduct(this.categorieproduct).subscribe({
      next: () => {
        this.redirectBack();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Catégorie inserer avec succès`,
          timer: 1500,
          showConfirmButton: false
        });  
      },
      error:() => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue, veuillez réessayer'         
        });
      }
    });
  }
  redirectBack(): void{
    this.router.navigate(['/catproduct-list']);
  }
}

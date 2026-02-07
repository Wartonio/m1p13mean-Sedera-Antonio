import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-c',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-c.component.html',
  styleUrl: './add-c.component.css'
})
export class AddCComponent {
  cat ={
    _id : '',
    ref: '',
    designation : ''
  };
  isLoading = false;

  constructor(
    private categoryService: CategoryService,
    private router : Router
  ){}

  ngOnInit(){

  }

  insertCategory(): void{
    this.isLoading = true;
    this.categoryService.insertCategory(this.cat).subscribe({
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
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue, veuillez réessayer'
        });
      }
    });
  }

  redirectBack(): void{
    this.router.navigate(['/cat-list']);
  }
}

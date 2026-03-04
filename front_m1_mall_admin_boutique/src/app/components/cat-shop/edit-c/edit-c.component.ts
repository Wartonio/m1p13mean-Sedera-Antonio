import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-c',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-c.component.html',
  styleUrl: './edit-c.component.css'
})
export class EditCComponent {
  id ='';
  category = {
    _id: '',
    ref: '',
    designation: ''
  };
  isLoading = false;

  constructor(
    private categoryService : CategoryService,
    private router : Router,
    private route : ActivatedRoute
  ){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadCategorySelected();
      }
    });
  }

  loadCategorySelected(){
    if (!this.id) {
      return;
    }
    this.categoryService.getOne(this.id).subscribe({
      next: (o : Category) => {
        this.category ={
          _id : o._id,
          ref : o.ref ?? '',
          designation : o.designation ?? ''
        };
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la collectte, veuillez réessayer'
        });
      }
    });
  }

  update(){
    this.categoryService.updateCategory(this.category).subscribe({
      next: () => {
        this.redirectBack();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Catégorie mis à jour`,
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
    })
  }

  redirectBack(): void{
    this.router.navigate(['/cat-list']);
  }
}

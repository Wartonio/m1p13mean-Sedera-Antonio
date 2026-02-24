import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcategoryproduit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editcategoryproduit.component.html',
  styleUrl: './editcategoryproduit.component.css'
})
export class EditcategoryproduitComponent {
    id ='';
  categoryproduct = {
    _id: '',
    ref: '',
    designation: ''
  };
  isLoading = false;

  constructor(private categoryproductservice: CategoryproductService,private router: Router,private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.id =params['id'];
      if(this.id){
        this.loadCategorySelected();
      }
    });
  }

    loadCategorySelected(){
      if (!this.id) {
        return;
      }
      this.categoryproductservice.getone(this.id).subscribe({
        next: (o : Categoryproduct) => {
          this.categoryproduct ={
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
        this.categoryproductservice.updateCategoryproduct(this.categoryproduct).subscribe({
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
    this.router.navigate(['/catproduct-list']);
  }
}

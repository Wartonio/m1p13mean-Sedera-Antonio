import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import { UserService } from 'src/app/service/user.service';
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
    designation : '',
    shop:''
  };
  isLoading = false;

   ngOnInit(){
    this.getmed();
  }

  constructor(private categoryproductservice: CategoryproductService, private router : Router,private userservice: UserService){}

    user!: User;
    
      getmed(){
      this.userservice.getMe().subscribe(
        (data: User) => {
          this.user = data;
          console.log(data);
          
        }
      );
      }

  insertcategoryproduct(): void{
    this.isLoading = true;
    this.categorieproduct.shop=this.user._id;
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

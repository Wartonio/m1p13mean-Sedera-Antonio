import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { User } from 'src/app/model/user';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
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
    image:'',
    shop:''
  };
  isLoading = false;

  categoryproduct : Categoryproduct[]=[];

  constructor(private router: Router,private productservice: ProductService,private categoryproductservice: CategoryproductService, private userservice :UserService){}

  ngOnInit(){
    this.getAllcategoryproduct(); 
    this.getmed(); 
  }
insertproduct(): void {
  this.isLoading = true;
  if (this.user) {
    // Mettre le shop du user connecté dans le produit
    this.product.shop = this.user._id;
    console.log(this.product.shop);  // ou this.user.shop si c’est l’ID du shop
  } else {
    console.error('Utilisateur non chargé, impossible de récupérer le shop');
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Utilisateur non connecté ou shop manquant'
    });
    this.isLoading = false;
    return;
  }

  console.log('Produit envoyé au backend :', this.product);

  this.productservice.insertproduct(this.product).subscribe({
    next: () => {
      this.redirectBack();
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: `Produit inséré avec succès`,
        timer: 1500,
        showConfirmButton: false
      });
    },
    error: (err) => {
      console.error('Erreur lors de l\'insertion du produit :', err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue, veuillez réessayer'
      });
    },
    complete: () => {
      this.isLoading = false;
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

  user!: User;

  getmed(){
  this.userservice.getMe().subscribe(
    (data: User) => {
      this.user = data;
      
    }
  );
  }

  redirectBack(): void{
    this.router.navigate(['/Listproduct']);
  }
}

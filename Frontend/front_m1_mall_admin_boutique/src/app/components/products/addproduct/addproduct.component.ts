import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { User } from 'src/app/model/user';
import { CategoryService } from 'src/app/service/category.service';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {

  selectedFile!: File;

  product = {
    designation: '',
    reference: '',
    category: '',
    description: '',
    status:'',
    price: 0,
    shop: ''
  };

  ngOnInit(){
    this.getcategoryproductbyshop(); 
    this.getmed(); 
  }

  onFileSelected(event: any){
    this.selectedFile= event.target.files[0];
  }

  constructor(private router: Router,private productservice: ProductService,private categoryproductservice: CategoryproductService, private userservice :UserService){}

  user!: User; 
  getmed(){ 
    this.userservice.getMe().subscribe( (data: User) =>
       { this.user = data; } ); 
  }

  isLoading = false;


  insertproduct(): void{
    if (!this.selectedFile) {
      alert('Veuillez sélectionner une image !');
      return;
    }
    if (!this.user) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Utilisateur non connecté'
    });
    return;
    }
    

    this.isLoading = true;

    const formData = new FormData();

    formData.append('designation', this.product.designation);
    formData.append('reference', this.product.reference);
    formData.append('category', this.product.category);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('status', this.product.status);
    formData.append('shop', this.user._id);
    formData.append('image', this.selectedFile);


    this.productservice.insertproductimage(formData).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Produit inséré avec succès',
        timer: 1500,
        showConfirmButton: false
      });
      this.redirectBack();
    },
    error: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue'
      });
    },
    complete: () => {
      this.isLoading = false;
    }
  });
  }
  categoryproduct : Categoryproduct[]=[];
  

 
  getcategoryproductbyshop(){
       this.userservice.getMe().pipe(
      switchMap((user: User) => {
        this.user = user;
  
        const shopId = user._id; 
  
        return this.categoryproductservice.getproductbyshop(shopId);
      })
      ).subscribe(
      (categoryproducts) => {
        this.categoryproduct = categoryproducts;
      },
      (error) => {
        console.error(error);
      }
    );
    }

    redirectBack(): void{
    this.router.navigate(['/Listproduct']);
  }
}

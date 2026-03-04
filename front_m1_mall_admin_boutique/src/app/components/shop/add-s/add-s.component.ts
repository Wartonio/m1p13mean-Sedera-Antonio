import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { ShopService } from 'src/app/service/shop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-s',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-s.component.html',
  styleUrl: './add-s.component.css'
})
export class AddSComponent {
  shop ={
    _id: '',
    nom: '',
    category: '',
    localisation: '',
    heureOuveture: '',
    heureFermeture: '',
    journal: '',
    remarque: '',
    status: ''
  };
  cats : Category[]=[];
  isLoading = false;

  ngOnInit() {
    this.getAllRoles();
  }

    onFileSelected(event: any){
    this.selectedFile= event.target.files[0];
  }


  constructor(
    private router: Router,
    private categoryService : CategoryService,
    private shopService : ShopService
  ) {}

  getAllRoles(){
    this.categoryService.getListCategorys().subscribe(
      (data : Category[])=>{
        this.cats = data;
      }
    )
  }

  selectedFile!: File;

  insertshop() {
      if (!this.selectedFile) {
          alert('Veuillez sélectionner une image !');
          return;
        }
    this.isLoading = true;

    const formData =new FormData();
    formData.append('nom',this.shop.nom);
    formData.append('category',this.shop.category);
    formData.append('localisation',this.shop.localisation);
    formData.append('heureOuveture',this.shop.heureOuveture);
    formData.append('heureFermeture',this.shop.heureFermeture);
    formData.append('journal',this.shop.journal);
    formData.append('remarque',this.shop.remarque);
    formData.append('status',this.shop.status);
    formData.append('image', this.selectedFile);
    this.shopService.insertShop(formData).subscribe({
      next: () => {
        this.redirectBack();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Utilisateur inserer avec succès`,
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
    this.router.navigate(['/shop-list']);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Shop } from 'src/app/model/shop';
import { CategoryService } from 'src/app/service/category.service';
import { ShopService } from 'src/app/service/shop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-s',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-s.component.html',
  styleUrl: './edit-s.component.css'
})
export class EditSComponent {
  id ='';
  shop = {
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
  categories : Category[]=[];
  isLoading = false;

  constructor(
    private shopService : ShopService,
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
    this.loadsCat();
  }

  loadsCat(){
    this.categoryService.getListCategorys().subscribe(
      (data : Category[])=>{
        this.categories =data;
      }
    )
  }

  loadCategorySelected(){
    if (!this.id) {
      return;
    }
    this.shopService.getOne(this.id).subscribe({
      next: (o : Shop) => {
        this.shop ={
          _id: o._id,
          nom: o.nom ?? '',
          category: o.category ?? '',
          localisation: o.localisation ?? '',
          heureOuveture: o.heureOuveture ?? '',
          heureFermeture: o.heureFermeture ?? '',
          journal: o.journal ?? '',
          remarque: o.remarque ?? '',
          status: o.status ?? ''
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
    this.shopService.updateShop(this.shop).subscribe({
      next: () => {
        this.redirectBack();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Shop mis à jour`,
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
    this.router.navigate(['/shop-list']);
  }
}

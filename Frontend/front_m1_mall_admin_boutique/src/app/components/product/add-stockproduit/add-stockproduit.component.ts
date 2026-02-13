import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { ProductService } from 'src/app/service/product.service';
import { StockService } from 'src/app/service/stock.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-stockproduit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-stockproduit.component.html',
  styleUrl: './add-stockproduit.component.css'
})
export class AddStockproduitComponent {
  stocks={
    _id:'',
    product:'',
    quantity:0,
    stockMin:0,
    shop:''
  };

  isLoading = false;
  product : Product[]=[];

  ngOnInit(){
    this.getmed(); 
  }

  constructor(private router: Router,private productservice: ProductService,private stockservice: StockService, private userservice :UserService){}

    user!: User;
  
    getmed(){
    this.userservice.getMe().subscribe(
      (data: User) => {
        this.user = data;
        console.log(data);
        
      }
    );
    }

  insertstockproduct(): void {


  this.isLoading = true;

  // Assigner le shop du user au stock
  this.stocks.shop = this.user._id;

  if (this.user) {
      // Mettre le shop du user connecté dans le produit
      this.stocks.shop = this.user._id;
      console.log(this.stocks.shop);  // ou this.user.shop si c’est l’ID du shop
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

  this.stockservice.insertstockproduct(this.stocks).subscribe({
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
      console.error('Erreur lors de l\'insertion du produit :', err);

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err?.error?.message || 'Une erreur est survenue, veuillez réessayer'
      });

      this.isLoading = false;
    },

    complete: () => {
      this.isLoading = false;
    }
  });
}

  
  redirectBack(): void{
    this.router.navigate(['/Listproduct']);
  }


}

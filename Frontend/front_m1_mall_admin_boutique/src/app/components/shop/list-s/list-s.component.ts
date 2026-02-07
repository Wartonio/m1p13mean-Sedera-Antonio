import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/service/shop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-s',
  standalone: true,
  imports: [CommonModule,PaginatorModule],
  templateUrl: './list-s.component.html',
  styleUrl: './list-s.component.css'
})
export class ListSComponent {
  totalElements = 0;
  page = 0;
  size = 5;
  shops: Shop[] = [];
  newStatus ='';

  constructor(
    private router: Router,
    private shopService : ShopService
  ) {}

  ngOnInit(): void {
    this.getAllShop();
  }

  getAllShop(){
    this.shopService.getListShops().subscribe(
      (data : Shop[])=> {
        this.shops = data;
      }
    )
  }

  // Fonctions d'action (vides pour l'exemple)
  editShop(id:string): void {
    this.router.navigate(['/shop-edit',id]);
  }

  toggleShopStatus(Shop: any): void {

    const isActive = Shop.status === 'active';
    const newStatus = isActive ? 'inactive' : 'active';

    Swal.fire({
      title: isActive ? 'Désactiver boutique ?' : 'Activer boutique ?',
      text: `Voulez-vous vraiment ${isActive ? 'désactiver' : 'activer'} cet boutique ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isActive ? '#dc3545' : '#198754',
      cancelButtonText: 'Annuler',
      confirmButtonText: isActive ? 'Désactiver' : 'Activer'
    }).then((result) => {

      if (result.isConfirmed) {

        this.shopService.changeStatus(Shop._id, newStatus).subscribe({
          next: () => {
            // Mise à jour locale
            Shop.status = newStatus;

            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: `Boutique ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès`,
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
    });
  }

  resetPassword(Shop: Shop): void {
    console.log('Réinitialiser le mot de passe de:', Shop);
  }

  addShop(): void {
    this.router.navigate(['/shop-add']);
  }

  onPageChange(event: any): void {
    this.page = event.page;
    this.size = event.rows;
  }
}

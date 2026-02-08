import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/service/shop.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-s',
  standalone: true,
  imports: [CommonModule,PaginatorModule],
  templateUrl: './list-s.component.html',
  styleUrl: './list-s.component.css'
})
export class ListSComponent {
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;
  search: string = '';
  totalShops: number = 0;
  shops: Shop[] = [];
  newStatus ='';
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private shopService : ShopService
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      this.search = searchValue;
      this.currentPage = 1; 
      this.getAllShop();
    });
    this.getAllShop();
  }

  getAllShop(){
    this.shopService.getShops(this.currentPage, this.limit, this.search).subscribe({
      next: (data) => {
        this.shops = data.shops;
        this.totalPages = data.totalPages;
        this.totalShops = data.total;
      },
      error: (err) => console.error("Erreur chargement", err)
    });
  }

  onSearch(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  onPageChange(event: any) {
      this.currentPage = event.page + 1; // PrimeNG commence à 0, ton API à 1
      this.limit = event.rows;           // Permet à l'utilisateur de changer "10 par page"
      this.getAllShop();
  }

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
}

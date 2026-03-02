import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/service/shop.service';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [CommonModule,PaginatorModule],
  standalone: true,  
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  // shops: Shop[] = [
  //   {
  //     id: 1,
  //     name: 'Sport Plaza',
  //     image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500&auto=format&fit=crop',
  //     location: 'Analakely, Pavillon 12',
  //     category: 'Sport & Loisirs',
  //     description: 'Le meilleur de l\'équipement sportif en plein cœur de la ville.'
  //   },
  //   {
  //     id: 2,
  //     name: 'Luxury Time',
  //     image: 'https://images.unsplash.com/photo-1524143820251-40994026363c?q=80&w=500&auto=format&fit=crop',
  //     location: 'Ivandry, Galerie Smart',
  //     category: 'Horlogerie',
  //     description: 'Montres de luxe et accessoires de haute précision.'
  //   },
  //   {
  //     id: 3,
  //     name: 'Tech Hub',
  //     image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500&auto=format&fit=crop',
  //     location: 'Ankorondrano, Zone TBE',
  //     category: 'Électronique',
  //     description: 'Gadgets high-tech et matériel informatique dernière génération.'
  //   },
  //   {
  //     id: 4,
  //     name: 'Mode & Style',
  //     image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=500&auto=format&fit=crop',
  //     location: 'Andraharo, Immeuble City',
  //     category: 'Prêt-à-porter',
  //     description: 'Vêtements tendance pour hommes et femmes.'
  //   }
  // ];

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

  redirectDetails(id : number){
    this.router.navigate(['shop-details',id]);
  }

    currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;
  search: string = '';
  totalShops: number = 0;
  shops: Shop[] = [];
  newStatus ='';
  private searchSubject = new Subject<string>();

    onPageChange(event: any) {
      this.currentPage = event.page + 1; // PrimeNG commence à 0, ton API à 1
      this.limit = event.rows;           // Permet à l'utilisateur de changer "10 par page"
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


  viewDetails(id : string) {
    this.router.navigate(['shop-details',id])
  }
}
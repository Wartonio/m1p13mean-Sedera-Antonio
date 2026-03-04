import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/service/shop.service';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../env/config';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [CommonModule,PaginatorModule],
  standalone: true,  
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  

  apiUrl = environment.apiUrl;
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
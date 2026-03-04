import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import indispensable
import Chart from 'chart.js/auto';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { ShopService } from 'src/app/service/shop.service';
import { Shop } from 'src/app/model/shop';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  iconClass: string;
  trendValue?: string;
  trendLabel?: string;
  footerLabel?: string;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule], // On injecte le module ici
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit, AfterViewInit {

  categories : Category[]=[];
  
  stats: StatCard[] = [
    { title: 'Categories Boutique', value: '152', icon: 'bi-envelope', iconClass: 'icon-cyan', trendValue: '24 nouveaux', trendLabel: 'depuis la visite' },
    { title: 'Boutiques', value: '532', icon: 'bi-geo-alt', iconClass: 'icon-orange', trendValue: '48 nouveaux', trendLabel: 'depuis la visite' },
    { title: 'Utilisateurs', value: '532', icon: 'bi-geo-alt', iconClass: 'icon-orange', trendValue: '48 nouveaux', trendLabel: 'depuis la visite' }
  ];

  recentActivities = [
    { id: 1, task: 'Mise à jour système', time: 'Il y a 2 min', status: 'bg-primary' },
    { id: 2, task: 'Nouvel utilisateur', time: 'Il y a 15 min', status: 'bg-success' },
    { id: 3, task: 'Sauvegarde terminée', time: 'Il y a 1h', status: 'bg-info' },
    { id: 4, task: 'Erreur serveur corrigée', time: 'Il y a 3h', status: 'bg-danger' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private userservice: UserService,
      private roleService : CategoryService,private shopService:  ShopService,private productservice: ProductService
    ){}

      currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;
  search: string = '';
  shops: Shop[] = [];
  totalShops: number = 0;

    getAllShop(){
    this.shopService.getShops(this.currentPage, this.limit, this.search).subscribe({
      next: (data) => {
        this.shops = data.shops;
        this.totalPages = data.totalPages;
        this.totalShops = data.total;
        this.stats[1].value = data.total.toString();        // total global
     
      },
      error: (err) => console.error("Erreur chargement", err)
    });
  }


  totalUsers: number = 0;
  users: any[] = [];

    getAllUser(){
    this.userservice.getUsers(this.currentPage, this.limit, this.search).subscribe({
      next: (data) => {
        this.users = data.users;
        this.totalPages = data.totalPages;
        this.totalUsers = data.total;
        this.stats[2].value = data.total.toString(); 
      },
      error: (err) => console.error("Erreur chargement", err)
    });
  }
  
    getAllCategories(){
      this.roleService.getListCategorys().subscribe(
        (data : Category[])=> {
          this.categories = data;
          this.stats[0].value = data.length.toString();
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

      product: Product[]=[];

          getAllproduct(){
    this.productservice.getListproduct().subscribe(
      (data : Product[])=>{
        this.product =data;
        this.stats[1].value = data.length.toString();
      console.log(data);
      }
    )
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllShop();
    this.getAllproduct();
    this.getAllUser();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    }
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            label: 'Visites',
            data: [400, 600, 500, 800, 700, 1100, 1300],
            fill: true,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      });
    }
  }
}
import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import indispensable
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import { Product } from 'src/app/model/product';
import { switchMap } from 'rxjs';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import { Commande } from 'src/app/model/commande';
import { CommandeService } from 'src/app/service/commande.service';
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
  selector: 'app-dashboard-boutique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-boutique.component.html',
  styleUrl: './dashboard-boutique.component.css'
})
export class DashboardBoutiqueComponent implements OnInit, AfterViewInit{

   product: Product[]=[];

   categoryproduct : Categoryproduct[]=[];

   commande: Commande[]=[];

    getproductbyshop(){
       this.userservice.getMe().pipe(
      switchMap((user: User) => {
        this.user = user;
  
        const shopId = user._id; 
  
        return this.productservice.getproductbyshop(shopId);
      })
      ).subscribe(
      (products) => {
        this.product = products;
        this.stats[0].value = products.length.toString();
        console.log(products.length);
      },
      (error) => {
        console.error(error);
      }
    );
    }

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
        this.stats[1].value = categoryproducts.length.toString();
        
      },
      (error) => {
        console.error(error);
      }
    );
    }

      getcommandebyshop(){
      this.userservice.getMe().pipe(
      switchMap((user: User) => {
        this.user = user;
  
        const shopId = user._id; 
  
        return this.commandeservice.getcommandebyshop(shopId);
      })
      ).subscribe(
      (commandes) => {
        this.commande = commandes;
        this.stats[2].value = commandes.length.toString();

        const total = commandes.reduce((sum, cmd) => {
        return sum + cmd.pricetotal;
      }, 0);
          this.stats[3].value = total.toString();
      },
      (error) => {
        console.error(error);
      }
    );
    }



  user!: User;

    getmed(){
    this.userservice.getMe().subscribe(
      (data: User) => {
        this.user = data;
        
      }
    );
    }

    


stats: StatCard[] = [
  { title: 'Produits', value: '0', icon: 'bi-envelope', iconClass: 'icon-cyan'},
  { title: 'Catégorie produit', value: '0', icon: 'bi-geo-alt', iconClass: 'icon-orange'},
  { title: 'Nombre de commandes', value: '28,441', icon: 'bi-file-earmark-check', iconClass: 'icon-slate'},
  { title: 'Chiffre d affaire', value: '25,660', icon: 'bi-people', iconClass: 'icon-violet'}
]; 



  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router,private productservice: ProductService, private userservice :UserService,private categoryproductservice :CategoryproductService ,private commandeservice: CommandeService) {}

   ngOnInit(): void {
    this.getproductbyshop();
    this.getcategoryproductbyshop();
    this.getcommandebyshop();
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

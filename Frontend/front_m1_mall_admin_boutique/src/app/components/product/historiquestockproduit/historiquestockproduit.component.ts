import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Stock } from 'src/app/model/stock';
import { User } from 'src/app/model/user';
import { StockService } from 'src/app/service/stock.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-historiquestockproduit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historiquestockproduit.component.html',
  styleUrl: './historiquestockproduit.component.css'
})
export class HistoriquestockproduitComponent {
  stock: Stock[]=[];
  
    constructor(private router: Router,private stockservice: StockService,private userservice :UserService){}
  
    ngOnInit(){
      this.getstockbyshop();
    }
  
    // getAllstockproduct(){
    //     this.stockservice.getListStock().subscribe(
    //       (data : Stock[])=>{
    //         this.stock =data;
    //       }
    //     )
    // }
   
    getstockbyshop(){
      this.userservice.getMe().pipe(
          switchMap((user: User) => {
            this.user = user;
      
            const shopId = user._id; 
            return this.stockservice.getstockproductbyshop(shopId);
          })).subscribe(
            (stocks) => {
                this.stock = stocks;
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
    addstockproduct(): void {
      this.router.navigate(['/addstock']);
    }

    
}

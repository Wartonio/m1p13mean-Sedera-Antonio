import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/app/model/stock';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stockproduit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stockproduit.component.html',
  styleUrl: './stockproduit.component.css'
})
export class StockproduitComponent {
   stock: Stock[]=[];

  constructor(private router: Router,private stockservice: StockService){}

  ngOnInit(){
    this.getAllstockproduct();
  }

  getAllstockproduct(){
      this.stockservice.getListStock().subscribe(
        (data : Stock[])=>{
          this.stock =data;
        }
      )
    }
     
}

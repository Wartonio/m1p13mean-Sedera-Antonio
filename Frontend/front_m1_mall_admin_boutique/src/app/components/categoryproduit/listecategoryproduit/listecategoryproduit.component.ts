import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';

@Component({
  selector: 'app-listecategoryproduit',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './listecategoryproduit.component.html',
  styleUrl: './listecategoryproduit.component.css'
})
export class ListecategoryproduitComponent {
  categoryproduct : Categoryproduct[]=[];
  ngOnInit(){
    this.getAllcategoryproduct();  
  }

  constructor(private router: Router,private categoryproductservice: CategoryproductService){}

  getAllcategoryproduct(){
    this.categoryproductservice.getListcategorieproduct().subscribe(
      (data : Categoryproduct[])=>{
        this.categoryproduct = data;
      }
    )
  }

  addcategoryproduct(): void {
    this.router.navigate(['/addcatprod']);
  }

}

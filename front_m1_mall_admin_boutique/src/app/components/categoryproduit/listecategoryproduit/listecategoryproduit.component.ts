import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoryproduct } from 'src/app/model/categoryproduct';
import { User } from 'src/app/model/user';
import { CategoryproductService } from 'src/app/service/categoryproduct.service';
import { UserService } from 'src/app/service/user.service';

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
    this.getcategoryproductbyshop();  
  }

  constructor(private router: Router,private categoryproductservice: CategoryproductService,private userservice:  UserService){}

  // getAllcategoryproduct(){
  //   this.categoryproductservice.getListcategorieproduct().subscribe(
  //     (data : Categoryproduct[])=>{
  //       this.categoryproduct = data;
  //     }
  //   )
  // }
  user!: User;
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
      },
      (error) => {
        console.error(error);
      }
    );
    }

  addcategoryproduct(): void {
    this.router.navigate(['/addcatprod']);
  }

  editCategory(id : string): void {
    this.router.navigate(['/catprod-edit',id]);
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Role } from 'src/app/model/role';
import { Shop } from 'src/app/model/shop';
import { User } from 'src/app/model/user';
import { RoleService } from 'src/app/service/role.service';
import { ShopService } from 'src/app/service/shop.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouts',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './ajouts.component.html',
  styleUrl: './ajouts.component.css'
})
export class AjoutsComponent {
  user ={
    _id: '',
    nom: '',
    email: '',
    role: '',
    status: '',
    password: '',
    boutiqueId: ''
  };
  roles : Role[]=[];
  shops : Shop[]=[];
  isLoading = false;

  ngOnInit() {
    this.getAllRoles();
    this.getAllShops();
  }

  constructor(
    private router: Router,
    private roleService : RoleService,
    private userService : UserService,
    private shopService : ShopService
  ) {}

  getAllRoles(){
    this.roleService.getListRoles().subscribe(
      (data : Role[])=>{
        this.roles = data;
      }
    )
  }
  
  getAllShops(){
    this.shopService.getListShops().subscribe(
      (data : Shop[])=>{
        this.shops = data;
      }
    )
  }

  insertUser() {
    this.isLoading = true;
    this.userService.insertUser(this.user).subscribe({
      next: () => {
        this.redirectBack();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Utilisateur inserer avec succès`,
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


  redirectBack(): void{
    this.router.navigate(['/user-list']);
  }
}

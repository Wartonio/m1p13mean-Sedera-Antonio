import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Role } from 'src/app/model/role';
import { Shop } from 'src/app/model/shop';
import { User } from 'src/app/model/user';
import { RoleService } from 'src/app/service/role.service';
import { ShopService } from 'src/app/service/shop.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifs',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './modifs.component.html',
  styleUrl: './modifs.component.css'
})
export class ModifsComponent {
  roles: Role[] = [];
  shops : Shop[]=[];
  id="";
  user ={
    _id: '',
    nom: '',
    email: '',
    role: '',
    status: '',
    password: '',
    boutiqueId: ''
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadCategorySelected();
      }
    });
    this.getAllRoles();
    this.getAllShops();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  loadCategorySelected(){
    if (!this.id) {
      return;
    }
    this.userService.getOne(this.id).subscribe({
      next: (o : User) => {
        this.user ={
          _id: o._id ?? '',
          nom: o.nom ?? '',
          email: o.email ?? '',
          role: o.role ?? '',
          status: o.status ?? '',
          password:'',
          boutiqueId: o.boutiqueId ?? ''
        };
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la collectte, veuillez réessayer'
        });
      }
    });
  }

  editUser() {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.redirectBack();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Shop mis à jour`,
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
    })
  }


  redirectBack(): void{
    this.router.navigate(['/user-list']);
  }
}

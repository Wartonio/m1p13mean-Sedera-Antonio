import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/service/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouts-r',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajouts-r.component.html',
  styleUrl: './ajouts-r.component.css'
})
export class AjoutsRComponent {
  role ={
    _id : '',
    ref: '',
    designation : ''
  };
  isLoading = false;

  constructor(
    private roleService: RoleService,
    private router : Router
  ){}

  ngOnInit(){

  }

  insertRole(): void{
    this.isLoading = true;
    this.roleService.insertRole(this.role).subscribe({
      next: () => {
        this.redirectBack();
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `Rôle inserer avec succès`,
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

  private handleError(message: string, error: any): void {
    console.error(message, error);
    Swal.fire('Erreur', message, 'error');
  }

  redirectBack(): void{
    this.router.navigate(['/role-list']);
  }
}

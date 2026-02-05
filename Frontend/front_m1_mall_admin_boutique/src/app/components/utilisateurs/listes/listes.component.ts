import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listes',
  standalone: true,
  imports: [CommonModule,PaginatorModule],
  templateUrl: './listes.component.html',
  styleUrl: './listes.component.css'
})
export class ListesComponent {
  totalElements = 0;
  page = 0;
  size = 5;
  users: User[] = [];
  newStatus ='';

  constructor(
    private router: Router,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getListUsers().subscribe(
      (data : User[])=> {
        this.users = data;
      }
    )
  }

  // Fonctions d'action (vides pour l'exemple)
  editUser(): void {
    console.log('Modifier l\'utilisateur:');
    this.router.navigate(['/user-edit']);
  }

  toggleUserStatus(user: any): void {

    const isActive = user.status === 'active';
    const newStatus = isActive ? 'inactive' : 'active';

    Swal.fire({
      title: isActive ? 'Désactiver utilisateur ?' : 'Activer utilisateur ?',
      text: `Voulez-vous vraiment ${isActive ? 'désactiver' : 'activer'} cet utilisateur ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isActive ? '#dc3545' : '#198754',
      cancelButtonText: 'Annuler',
      confirmButtonText: isActive ? 'Désactiver' : 'Activer'
    }).then((result) => {

      if (result.isConfirmed) {

        this.userService.changeStatus(user._id, newStatus).subscribe({
          next: () => {
            // Mise à jour locale
            user.status = newStatus;

            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: `Utilisateur ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès`,
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
    });
  }

  resetPassword(user: User): void {
    console.log('Réinitialiser le mot de passe de:', user);
  }

  addUser(): void {
    this.router.navigate(['/user-add']);
  }

  onPageChange(event: any): void {
    this.page = event.page;
    this.size = event.rows;
  }
}

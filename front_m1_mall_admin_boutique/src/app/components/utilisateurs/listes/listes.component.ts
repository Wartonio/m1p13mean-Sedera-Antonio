import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-listes',
  standalone: true,
  imports: [CommonModule,PaginatorModule],
  templateUrl: './listes.component.html',
  styleUrl: './listes.component.css'
})
export class ListesComponent {
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;
  search: string = '';
  totalUsers: number = 0;
  users: any[] = [];
  newStatus ='';
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      this.search = searchValue;
      this.currentPage = 1; 
      this.getAllUser();
    });
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getUsers(this.currentPage, this.limit, this.search).subscribe({
      next: (data) => {
        this.users = data.users;
        this.totalPages = data.totalPages;
        this.totalUsers = data.total;
      },
      error: (err) => console.error("Erreur chargement", err)
    });
  }

  onSearch(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  onPageChange(event: any) {
      this.currentPage = event.page + 1; // PrimeNG commence à 0, ton API à 1
      this.limit = event.rows;           // Permet à l'utilisateur de changer "10 par page"
      this.getAllUser();
  }

  // Fonctions d'action (vides pour l'exemple)
  editUser(id : string): void {
    console.log('Modifier l\'utilisateur:');
    this.router.navigate(['/user-edit',id]);
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
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';


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

  toggleUserStatus(user: User): void {
    console.log('Changer le statut de l\'utilisateur:', user);
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

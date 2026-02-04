import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Actif' | 'Inactif' | 'En attente';
}
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
  users: User[] = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'Administrateur', status: 'Actif' },
    { id: 2, name: 'Marie Curie', email: 'marie.curie@example.com', role: 'Éditeur', status: 'Inactif' },
    { id: 3, name: 'Pierre Martin', email: 'pierre.martin@example.com', role: 'Membre', status: 'Actif' },
    { id: 4, name: 'Sophie Dubois', email: 'sophie.dubois@example.com', role: 'Administrateur', status: 'En attente' },
    { id: 5, name: 'Lucie Petit', email: 'lucie.petit@example.com', role: 'Membre', status: 'Actif' },
    { id: 6, name: 'Marc Bernard', email: 'marc.bernard@example.com', role: 'Éditeur', status: 'Inactif' }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  // Fonctions d'action (vides pour l'exemple)
  editUser(): void {
    console.log('Modifier l\'utilisateur:');
    this.router.navigate(['/user-edit']);
  }

  toggleUserStatus(user: User): void {
    console.log('Changer le statut de l\'utilisateur:', user);
    // Logique pour activer/désactiver
  }

  resetPassword(user: User): void {
    console.log('Réinitialiser le mot de passe de:', user);
    // Logique pour réinitialiser le mot de passe
  }

  addUser(): void {
    this.router.navigate(['/user-add']);
  }
  onPageChange(event: any): void {
    this.page = event.page;
    this.size = event.rows;
  }
}

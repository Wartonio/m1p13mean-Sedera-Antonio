import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
interface Role {
  idRole: number | string;
  designation: string;
}
@Component({
  selector: 'app-ajouts',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './ajouts.component.html',
  styleUrl: './ajouts.component.css'
})
export class AjoutsComponent {
  roles: Role[] = [
    { idRole: 1, designation: 'Administrateur' },
    { idRole: 2, designation: 'Boutique' },
    { idRole: 3, designation: 'Achteur' }
  ];

  ngOnInit(): void {}

  constructor(private router: Router) {}

  insertUser() {
    console.log("Utilisateur enregistré !");
  }


  redirectBack(): void{
    this.router.navigate(['/users']);
  }
}

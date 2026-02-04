import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
interface Role {
  idRole: number | string;
  designation: string;
}
@Component({
  selector: 'app-modifs',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './modifs.component.html',
  styleUrl: './modifs.component.css'
})
export class ModifsComponent {
  roles: Role[] = [
    { idRole: 1, designation: 'Administrateur' },
    { idRole: 2, designation: 'Boutique' },
    { idRole: 3, designation: 'Achteur' }
  ];

  ngOnInit(): void {}

  constructor(private router: Router) {}

  editUser() {
    console.log("Utilisateur enregistré !");
  }


  redirectBack(): void{
    this.router.navigate(['/users']);
  }
}

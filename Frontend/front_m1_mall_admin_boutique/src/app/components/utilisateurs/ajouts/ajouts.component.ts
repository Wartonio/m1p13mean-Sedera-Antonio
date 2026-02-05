import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-ajouts',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './ajouts.component.html',
  styleUrl: './ajouts.component.css'
})
export class AjoutsComponent {
  user :  User | null = null;

  ngOnInit(): void {}

  constructor(private router: Router) {}

  insertUser() {
    console.log("Utilisateur enregistré !");
  }


  redirectBack(): void{
    this.router.navigate(['/users']);
  }
}

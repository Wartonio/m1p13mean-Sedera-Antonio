import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Commande } from 'src/app/model/commande';
import { User } from 'src/app/model/user';
import { CommandeService } from 'src/app/service/commande.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-listecommande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listecommande.component.html',
  styleUrl: './listecommande.component.css'
})
export class ListecommandeComponent {
  
  commande: Commande[]=[];

  constructor(private router: Router,private commandeservice: CommandeService, private userservice :UserService){}
    
  user!: User;
  getmed(){
    this.userservice.getMe().subscribe(
      (data: User) => {
        this.user = data;       
      }
    );
  }

  ngOnInit(){
    this.getcommandebyshop();
    this.getmed();
  }

  getcommandebyshop(){
      this.userservice.getMe().pipe(
      switchMap((user: User) => {
        this.user = user;
  
        const shopId = user._id; 
  
        return this.commandeservice.getcommandebyshop(shopId);
      })
      ).subscribe(
      (commandes) => {
        this.commande = commandes;
      },
      (error) => {
        console.error(error);
      }
    );
    }

}

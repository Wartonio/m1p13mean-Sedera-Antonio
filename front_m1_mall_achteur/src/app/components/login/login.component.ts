import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ResponseAuth } from 'src/app/model/responseAuth';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  isLoading: boolean = false;
  isMobile: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.user.email || !this.user.password) {
      Swal.fire('Attention', 'Veuillez remplir tous les champs.', 'warning');
      return;
    }
  
    this.isLoading = true;
  
    this.authService.login(this.user)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: ResponseAuth) => {
          const role = (data?.role || '').toString().trim().toLowerCase();

          if (role === 'acheteur') {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            });
            
            Toast.fire({
              icon: 'success',
              title: 'Connexion réussie'
            });
  
            this.router.navigate(['/home']);
          } else {
            Swal.fire('Accès refusé', 'Ce compte n’est pas un compte acheteur.', 'error');
            this.authService.logout(); // On nettoie le token si nécessaire
          }
        },
        error: (err) => {
          let errorMessage = 'Email ou mot de passe incorrect.';
          if (err.status === 0) errorMessage = 'Le serveur est injoignable.';
          
          Swal.fire({
            title: 'Erreur',
            text: errorMessage,
            icon: 'error',
            confirmButtonColor: '#000'
          });
        }
      });
  }
}

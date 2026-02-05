import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { ResponseAuth } from 'src/app/model/responseAuth';
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
    if (!this.user?.email || !this.user?.password) {
      Swal.fire('Validation', 'Veuillez renseigner le email et le mot de passe.', 'warning');
      return;
    }
  
    this.isLoading = true;
  
    this.authService.login(this.user)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: ResponseAuth) => {
          const token = data?.token?.trim();
          const role  = (data?.role ?? '').toString().trim().toLowerCase();
        
          if (!token) {
            Swal.fire('Erreur', 'Le serveur n’a pas renvoyé de jeton (token).', 'error');
            return;
          }
        
          this.authService.saveToken(token);
        
          const routeByRole: Record<string, string> = {
            admin: '/dashboard-admin',
            boutique:  '/dashboard-boutique'
          };
        
          const target = routeByRole[role] ?? '/login'; 
        
          this.router.navigate([target], { replaceUrl: true });

          if (!(role in routeByRole)) {
            Swal.fire('Attention', `Rôle "${data?.role}" non reconnu.`, 'warning');
          }
        },        
        error: () => {
          Swal.fire({
            title: 'Erreur de connexion',
            text: 'Email ou mot de passe incorrect. Veuillez réessayer.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
  }
}


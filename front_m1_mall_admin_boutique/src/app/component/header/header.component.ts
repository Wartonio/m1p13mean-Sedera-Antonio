import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ngOnInit(){
    
  }

  constructor(
    private authService : AuthService,
    private router: Router
  ){}

  logout() {
    this.authService.logout();
  }
}

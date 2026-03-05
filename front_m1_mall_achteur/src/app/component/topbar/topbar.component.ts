import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  
  isLoggedIn: boolean = false;
  
  constructor(
    private authService : AuthService,
    private router: Router
  ){}
  
  ngOnInit(){
    this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }
}

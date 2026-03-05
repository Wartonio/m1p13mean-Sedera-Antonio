import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {   
    isLoggedIn: boolean = false;
    
    constructor(
      private authService : AuthService
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

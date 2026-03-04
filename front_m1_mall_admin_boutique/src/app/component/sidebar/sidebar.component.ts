import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  user : User | null=null;

  ngOnInit(){
    this.getUserConnected();
  }

  constructor(
    private userService : UserService
  ){}

  getUserConnected(){
    this.userService.getMe().subscribe(
      (object : User) => {
        this.user = object;
      }
    )
  }
}

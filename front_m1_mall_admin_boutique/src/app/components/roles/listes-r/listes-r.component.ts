import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-listes-r',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listes-r.component.html',
  styleUrl: './listes-r.component.css'
})
export class ListesRComponent {
  roles : Role[]=[];


  ngOnInit(){
    this.getAllRole();
  }

  constructor(
    private router: Router,
    private roleService : RoleService
  ){}

  getAllRole(){
    this.roleService.getListRoles().subscribe(
      (data : Role[])=> {
        this.roles = data;
      }
    )
  }

  addRole(): void {
    this.router.navigate(['/role-add']);
  }
}

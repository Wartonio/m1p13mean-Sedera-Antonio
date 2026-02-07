import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-lsit-c',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lsit-c.component.html',
  styleUrl: './lsit-c.component.css'
})
export class LsitCComponent {
  categories : Category[]=[];

  ngOnInit(){
    this.getAllCategories();
  }

  constructor(
    private router: Router,
    private roleService : CategoryService
  ){}

  getAllCategories(){
    this.roleService.getListCategorys().subscribe(
      (data : Category[])=> {
        this.categories = data;
      }
    )
  }

  editCategory(id : string): void {
    this.router.navigate(['/cat-edit',id]);
  }

  addRole(): void {
    this.router.navigate(['/cat-add']);
  }
}

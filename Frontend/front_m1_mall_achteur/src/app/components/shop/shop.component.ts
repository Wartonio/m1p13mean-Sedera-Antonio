import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Shop {
  id: number;
  name: string;
  image: string;
  location: string;    // Nouvelle propriété
  category: string;    // Secteur d'activité
  description: string; // Petit texte d'accroche
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shops: Shop[] = [
    {
      id: 1,
      name: 'Sport Plaza',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500&auto=format&fit=crop',
      location: 'Analakely, Pavillon 12',
      category: 'Sport & Loisirs',
      description: 'Le meilleur de l\'équipement sportif en plein cœur de la ville.'
    },
    {
      id: 2,
      name: 'Luxury Time',
      image: 'https://images.unsplash.com/photo-1524143820251-40994026363c?q=80&w=500&auto=format&fit=crop',
      location: 'Ivandry, Galerie Smart',
      category: 'Horlogerie',
      description: 'Montres de luxe et accessoires de haute précision.'
    },
    {
      id: 3,
      name: 'Tech Hub',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500&auto=format&fit=crop',
      location: 'Ankorondrano, Zone TBE',
      category: 'Électronique',
      description: 'Gadgets high-tech et matériel informatique dernière génération.'
    },
    {
      id: 4,
      name: 'Mode & Style',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=500&auto=format&fit=crop',
      location: 'Andraharo, Immeuble City',
      category: 'Prêt-à-porter',
      description: 'Vêtements tendance pour hommes et femmes.'
    }
  ];

  constructor(
    private router : Router
  ) {}

  ngOnInit() { }

  redirectDetails(id : number){
    this.router.navigate(['shop-details',id]);
  }
}
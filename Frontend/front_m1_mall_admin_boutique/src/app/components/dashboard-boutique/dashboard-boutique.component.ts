import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import indispensable
import Chart from 'chart.js/auto';
interface StatCard {
  title: string;
  value: string;
  icon: string;
  iconClass: string;
  trendValue?: string;
  trendLabel?: string;
  footerLabel?: string;
}
@Component({
  selector: 'app-dashboard-boutique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-boutique.component.html',
  styleUrl: './dashboard-boutique.component.css'
})
export class DashboardBoutiqueComponent implements OnInit, AfterViewInit{
  stats: StatCard[] = [
    { title: 'Messages', value: '152', icon: 'bi-envelope', iconClass: 'icon-cyan', trendValue: '24 nouveaux', trendLabel: 'depuis la visite' },
    { title: 'Check-ins', value: '532', icon: 'bi-geo-alt', iconClass: 'icon-orange', trendValue: '48 nouveaux', trendLabel: 'depuis la visite' },
    { title: 'Files Synced', value: '28,441', icon: 'bi-file-earmark-check', iconClass: 'icon-slate', footerLabel: '32,56 / 250 GB utilisé' },
    { title: 'Users Online', value: '25,660', icon: 'bi-people', iconClass: 'icon-violet', trendValue: '72 nouveaux', trendLabel: 'cette semaine' }
  ];

  recentActivities = [
    { id: 1, task: 'Mise à jour système', time: 'Il y a 2 min', status: 'bg-primary' },
    { id: 2, task: 'Nouvel utilisateur', time: 'Il y a 15 min', status: 'bg-success' },
    { id: 3, task: 'Sauvegarde terminée', time: 'Il y a 1h', status: 'bg-info' },
    { id: 4, task: 'Erreur serveur corrigée', time: 'Il y a 3h', status: 'bg-danger' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    }
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            label: 'Visites',
            data: [400, 600, 500, 800, 700, 1100, 1300],
            fill: true,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      });
    }
  }
}

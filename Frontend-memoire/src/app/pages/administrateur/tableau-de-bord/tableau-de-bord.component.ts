import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: Date;
}

const USERS_DATA: User[] = [
  { id: 1, name: 'Jean Dupont', email: 'jean.dupont@ecourrier.com', role: 'ADMIN', active: true, createdAt: new Date('2025-01-15') },
  { id: 2, name: 'Marie Martin', email: 'marie.martin@ecourrier.com', role: 'AGENT_BUREAU_COURRIER', active: true, createdAt: new Date('2025-01-14') },
  { id: 3, name: 'Pierre Durand', email: 'pierre.durand@ecourrier.com', role: 'SECRETAIRE', active: false, createdAt: new Date('2025-01-13') },
  { id: 4, name: 'Sophie Bernard', email: 'sophie.bernard@ecourrier.com', role: 'DIRECTEUR', active: true, createdAt: new Date('2025-01-12') },
  { id: 5, name: 'Luc Moreau', email: 'luc.moreau@ecourrier.com', role: 'AGENT_BUREAU_COURRIER', active: true, createdAt: new Date('2025-01-11') },
  { id: 6, name: 'Anne Petit', email: 'anne.petit@ecourrier.com', role: 'SECRETAIRE', active: false, createdAt: new Date('2025-01-10') },
  { id: 7, name: 'Michel Roux', email: 'michel.roux@ecourrier.com', role: 'AGENT_BUREAU_COURRIER', active: true, createdAt: new Date('2025-01-09') },
  { id: 8, name: 'Claire Blanc', email: 'claire.blanc@ecourrier.com', role: 'SECRETAIRE', active: true, createdAt: new Date('2025-01-08') },
];
@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})

export class TableauDeBordComponent implements OnInit {
  // Données des utilisateurs
  usersDisplayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'actions'];
  usersDataSource = new MatTableDataSource(USERS_DATA);
  
  // Statistiques
  totalUsers = 200;
  activeUsers = 400;
  inactiveUsers = 400;
  totalRoles = 6;
  
  // Graphique des utilisateurs
  public usersChartData: ChartData;
  public usersChartOptions: ChartConfiguration['options'];
  public smallBarChart: any;
  public smallAreaChart: any;
  public smallColumnChart: any;
  public smallLineChart: any;

  // Histogramme Courriers année
  public courrierAnneeData: ChartData;
  public courrierAnneeOptions: ChartConfiguration['options'];

  // Camembert Courriers du jour
  public courrierJourData: ChartData;
  public courrierJourOptions: ChartConfiguration['options'];

  // Déclaration des propriétés manquantes
  public areaChartPlugins: any[] = [];

  public areaChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        display: false
      },
      x: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#9aa0ac'
        }
      }
    }
  };

  public areaChartData: ChartData = {
    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    datasets: [
      {
        label: 'Foods',
        data: [24, 18, 16, 18, 24, 36, 28],
        backgroundColor: 'rgba(85, 85, 255, 0.7)',
        borderColor: 'transparent',
        fill: true
      },
      {
        label: 'Electronics',
        data: [20, 22, 30, 22, 18, 22, 30],
        backgroundColor: 'rgba(255, 85, 184, 0.7)',
        borderColor: 'transparent',
        fill: true
      }
    ]
  };

  public radarChartType: ChartType = 'radar';
  public radarChartPlugins: any[] = [];

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Radar Chart'
      }
    }
  };

  public radarChartData: ChartData = {
    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    datasets: [
      {
        data: [25, 59, 90, 81, 60, 82, 52],
        label: 'Product',
        fill: true,
        backgroundColor: 'rgba(109, 144, 232,0.8)'
      },
      {
        data: [40, 100, 40, 90, 40, 90, 84],
        label: 'Services',
        fill: true,
        backgroundColor: 'rgba(255, 140, 96,0.8)'
      }
    ]
  };

  public sampleData = [
    31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77, 31, 40, 28, 44, 60, 55
  ];

  breadscrums = [
    {
      title: 'Dashboard Administrateur',
      items: ['Accueil'],
      active: 'Dashboard'
    }
  ];
  
  constructor() {}

  ngOnInit() {
    this.initUsersChart();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getRoleClass(role: string): string {
    switch (role) {
      case 'ADMIN': return 'admin';
      case 'AGENT_BUREAU_COURRIER': return 'agent';
      case 'SECRETAIRE': return 'secretaire';
      case 'DIRECTEUR': return 'directeur';
      default: return 'agent';
    }
  }
  
  editUser(user: User) {
    console.log('Modifier utilisateur:', user);
    // Logique pour modifier l'utilisateur
  }
  
  toggleUserStatus(user: User) {
    user.active = !user.active;
    console.log('Statut utilisateur modifié:', user);
    // Logique pour changer le statut de l'utilisateur
  }


  private initUsersChart() {
    this.usersChartData = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [
        {
          label: 'Actifs',
          data: [380, 385, 390, 395, 400, 405, 410, 415, 420, 425, 430, 400],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Inactifs',
          data: [420, 415, 410, 405, 400, 395, 390, 385, 380, 375, 370, 400],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };

    this.usersChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Utilisateurs 2025',
          font: {
            size: 18,
            weight: 'bold'
          },
          color: '#1e293b',
          padding: {
            bottom: 20
          }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#2563eb',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#64748b'
          }
        },
        y: {
          beginAtZero: true,
          max: 500,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 11
            },
            color: '#64748b'
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    };
  }
}

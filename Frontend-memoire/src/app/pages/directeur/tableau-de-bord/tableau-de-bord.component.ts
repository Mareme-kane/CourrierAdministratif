import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.sass']
})
export class TableauDeBordComponent implements OnInit {

  // Graphique 1: Courriers entrants/sortants par année
  public courrierAnnuelData: ChartData;
  public courrierAnnuelOptions: ChartConfiguration['options'];

  // Graphique 2: Camembert des courriers du jour
  public courrierJourData: ChartData;
  public courrierJourOptions: ChartConfiguration['options'];

  // Graphique 3: Histogramme des courriers imputés du mois
  public courrierImputeData: ChartData;
  public courrierImputeOptions: ChartConfiguration['options'];

  // Graphique 4: Courriers traités par année
  public courrierTraiteData: ChartData;
  public courrierTraiteOptions: ChartConfiguration['options'];

  breadscrums = [
    {
      title: 'Tableau de bord - Directeur',
      items: ['Directeur'],
      active: 'Tableau de bord'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initCourrierAnnuelChart();
    this.initCourrierJourChart();
    this.initCourrierImputeChart();
    this.initCourrierTraiteChart();
  }

  // Graphique 1: Courbe des courriers entrants/sortants par année
  private initCourrierAnnuelChart() {
    this.courrierAnnuelData = {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Courriers Entrants',
        data: [1250, 1380, 1520, 1680, 1850, 1920],
        borderColor: '#009DE5',
        backgroundColor: 'rgba(0, 157, 229, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }, {
        label: 'Courriers Sortants',
        data: [980, 1120, 1280, 1350, 1420, 1480],
        borderColor: '#28c76f',
        backgroundColor: 'rgba(40, 199, 111, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    };

    this.courrierAnnuelOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Évolution Annuelle des Courriers',
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nombre de Courriers'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Années'
          }
        }
      }
    };
  }

  // Graphique 2: Camembert des courriers du jour
  private initCourrierJourChart() {
    this.courrierJourData = {
      labels: ['Entrants', 'Sortants', 'Traités', 'En Attente', 'Imputés'],
      datasets: [{
        data: [25, 18, 32, 12, 8],
        backgroundColor: [
          '#009DE5',
          '#28c76f',
          '#ff9800',
          '#f44336',
          '#9c27b0'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    this.courrierJourOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Répartition du ' + new Date().toLocaleDateString('fr-FR'),
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: true,
          position: 'bottom'
        }
      }
    };
  }

  // Graphique 3: Histogramme des courriers imputés du mois
  private initCourrierImputeChart() {
    this.courrierImputeData = {
      labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
      datasets: [{
        label: 'Courriers Imputés',
        data: [12, 18, 15, 22],
        backgroundColor: '#009DE5',
        borderColor: '#007bb5',
        borderWidth: 2
      }]
    };

    this.courrierImputeOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Courriers Imputés - ' + new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nombre de Courriers'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Périodes'
          }
        }
      }
    };
  }

  // Graphique 4: Courbe des courriers traités par année
  private initCourrierTraiteChart() {
    this.courrierTraiteData = {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Courriers Traités',
        data: [890, 1050, 1180, 1320, 1450, 1580],
        borderColor: '#28c76f',
        backgroundColor: 'rgba(40, 199, 111, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#28c76f',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    };

    this.courrierTraiteOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Évolution des Courriers Traités',
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nombre de Courriers Traités'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Années'
          }
        }
      }
    };
  }
}
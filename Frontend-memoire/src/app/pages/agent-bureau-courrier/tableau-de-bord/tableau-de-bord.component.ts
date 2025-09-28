import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Demande de congé', weight: 1, symbol: 'En cours'},
    {position: 2, name: 'Rapport mensuel', weight: 2, symbol: 'Traité'},
    {position: 3, name: 'Note de service', weight: 1, symbol: 'En cours'},
    {position: 4, name: 'Convocation réunion', weight: 3, symbol: 'Archivé'},
    {position: 5, name: 'Facture fournisseur', weight: 2, symbol: 'Traité'},
    {position: 6, name: 'Courrier urgent', weight: 1, symbol: 'En cours'},
    {position: 7, name: 'Demande matériel', weight: 2, symbol: 'Traité'},
    {position: 8, name: 'Rapport activité', weight: 3, symbol: 'Archivé'},
];
@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})

export class TableauDeBordComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
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
      title: 'Tableau de bord',
      items: ['Accueil'],
      active: 'Tableau de bord'
    }
  ];
  constructor() {}

  ngOnInit() {
    this.cardChart1();
    this.cardChart2();
    this.cardChart3();
    this.cardChart4();
    this.chart1();
    this.chart2();
    this.initCourrierAnneeChart();
    this.initCourrierJourChart();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private cardChart1() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%'
        }
      },
      series: [
        {
          name: 'income',
          data: this.sampleData
        }
      ],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {},
        marker: {
          show: false
        }
      }
    };
  }
  private cardChart2() {
    this.smallAreaChart = {
      series: [
        {
          name: 'order',
          data: this.sampleData
        }
      ],
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: 'straight'
      },
      colors: ['#00E396'],
      xaxis: {
        labels: {
          show: false
        }
      },
      legend: {
        show: false
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false
      }
    };
  }
  private cardChart3() {
    this.smallColumnChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%'
        }
      },
      series: [
        {
          name: 'income',
          data: this.sampleData
        }
      ],

      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {},
        marker: {
          show: false
        }
      }
    };
  }
  private cardChart4() {
    this.smallLineChart = {
      series: [
        {
          name: 'Users',
          data: this.sampleData
        }
      ],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      stroke: {
        curve: 'straight',
        colors: ['#FEB019'],
        width: 4
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        marker: {
          show: false
        }
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      legend: {
        show: false
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false
      }
    };
  }

  private chart1() {
    this.areaChartOptions = {
      responsive: true,
      elements: {
        point: {
          radius: 0,
          hitRadius: 5,
          hoverRadius: 5
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
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false,
          beginAtZero: true
        }
      }
    };

    this.areaChartPlugins = [
      {
        afterLayout: (chart) => {
          const ctx = chart.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 0, 0, 150);
          const dataset = chart.data.datasets[0];

          gradientStroke.addColorStop(0, '#5555FF');
          gradientStroke.addColorStop(1, '#9787FF');
          dataset.backgroundColor = gradientStroke;
          dataset.borderColor = 'transparent';
          dataset.pointBorderColor = 'transparent';
          dataset.pointBackgroundColor = 'transparent';
          dataset.lineTension = '0.4';

          const gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 150);
          const dataset2 = chart.data.datasets[1];
          gradientStroke2.addColorStop(0, '#FF55B8');
          gradientStroke2.addColorStop(1, '#FF8787');
          dataset2.backgroundColor = gradientStroke2;
          dataset2.borderColor = 'transparent';
          dataset2.pointBorderColor = 'transparent';
          dataset2.pointBackgroundColor = 'transparent';
          dataset2.lineTension = '0.4';
        }
      }
    ];

    this.areaChartData = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Foods',
          data: [24, 18, 16, 18, 24, 36, 28],
          fill: true
        },
        {
          label: 'Electronics',
          data: [20, 22, 30, 22, 18, 22, 30],
          fill: true
        }
      ]
    };
  }

  private chart2() {
    this.radarChartPlugins = [
      {
        afterLayout: (chart) => {
          const ctx = chart.chart.ctx;
          const gradientStroke = ctx.createLinearGradient(0, 0, 0, 150);
          const dataset = chart.data.datasets[0];

          gradientStroke.addColorStop(0, 'rgba(85, 85, 255, 0.9)');
          gradientStroke.addColorStop(1, 'rgba(151, 135, 255, 0.8)');
          dataset.backgroundColor = gradientStroke;
          dataset.borderColor = 'transparent';
          dataset.pointBackgroundColor = 'transparent';
          dataset.pointBorderColor = 'transparent';
          dataset.pointHoverBackgroundColor = 'transparent';
          dataset.pointHoverBorderColor = 'transparent';
          dataset.pointHitRadius = 50;

          const gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 150);
          const dataset2 = chart.data.datasets[1];
          gradientStroke2.addColorStop(0, 'rgba(255, 85, 184, 0.9)');
          gradientStroke2.addColorStop(1, 'rgba(255, 135, 135, 0.8)');
          dataset2.backgroundColor = gradientStroke2;
          dataset2.borderColor = 'transparent';
          dataset2.pointBackgroundColor = 'transparent';
          dataset2.pointBorderColor = 'transparent';
          dataset2.pointHoverBackgroundColor = 'transparent';
          dataset2.pointHoverBorderColor = 'transparent';
          dataset2.pointHitRadius = 50;
        }
      }
    ];

    this.radarChartData = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          data: [25, 59, 90, 81, 60, 82, 52],
          label: 'Product',
          fill: true
        },
        {
          data: [40, 100, 40, 90, 40, 90, 84],
          label: 'Services',
          fill: true
        }
      ]
    };
  }

  private initCourrierAnneeChart() {
    this.courrierAnneeData = {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [{
        label: 'Courriers entrants',
        data: [95, 108, 125, 118, 102, 89, 95, 110, 130, 115, 98, 85],
        backgroundColor: '#87CEEB'
      }, {
        label: 'Courriers sortants',
        data: [45, 52, 68, 61, 58, 49, 55, 62, 70, 58, 48, 42],
        backgroundColor: '#4682B4'
      }]
    };

    this.courrierAnneeOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Courriers année'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nombre de courriers'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Mois'
          }
        }
      }
    };
  }

  private initCourrierJourChart() {
    this.courrierJourData = {
      labels: ['Courriers entrants', 'Courriers sortants', 'Courriers traités', 'Courriers archivés'],
      datasets: [{
        data: [25, 18, 32, 12],
        backgroundColor: ['#B0E0E6', '#87CEEB', '#4682B4', '#2F4F4F']
      }]
    };

    this.courrierJourOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Courriers du jour'
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return context.label + ': ' + context.parsed;
            }
          }
        }
      }
    };
  }
}

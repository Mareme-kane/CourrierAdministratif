import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-courrier-entrant',
    templateUrl: './courrier-entrant.component.html',
    styleUrls: ['./courrier-entrant.component.sass'],
    standalone: false
})
export class CourrierEntrantComponent implements OnInit {
  breadscrums = [
    {
      title: 'Courriers Entrants',
      items: ['Directeur'],
      active: 'Courriers Entrants'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

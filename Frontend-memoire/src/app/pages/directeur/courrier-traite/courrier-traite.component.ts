import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-courrier-traite',
    templateUrl: './courrier-traite.component.html',
    styleUrls: ['./courrier-traite.component.sass'],
    standalone: false
})
export class CourrierTraiteComponent implements OnInit {
  breadscrums = [
    {
      title: 'Courrier Traite',
      items: ['Agent Bureau Courrier'],
      active: 'Courrier Traite'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-courrier-sortant',
    templateUrl: './courrier-sortant.component.html',
    styleUrls: ['./courrier-sortant.component.sass'],
    standalone: false
})
export class CourrierSortantComponent implements OnInit {
  breadscrums = [
    {
      title: 'Courrier Sortant',
      items: ['Agent Bureau Courrier'],
      active: 'Courrier Sortant'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

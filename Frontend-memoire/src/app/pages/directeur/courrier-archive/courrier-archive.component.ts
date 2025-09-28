import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-courrier-archive',
    templateUrl: './courrier-archive.component.html',
    styleUrls: ['./courrier-archive.component.sass'],
    standalone: false
})
export class CourrierArchiveComponent implements OnInit {
  breadscrums = [
    {
      title: 'Agent Bureau Courrier',
      items: ['Courrier Archive'],
      active: 'Courrier Archive'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

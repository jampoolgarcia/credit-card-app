import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styles: [`
    .fa {
      margin-right: 7px;
      cursor: pointer;
    }
  `]
})
export class ListCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

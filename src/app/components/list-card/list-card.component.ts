import { Component, OnInit } from '@angular/core';
import { CreditCardI } from 'src/app/model/credit-card';
import { CreditCardService } from 'src/app/services/credit-card.service';

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

  public recordList: CreditCardI[] = [];

  constructor(private _service: CreditCardService) { }

  ngOnInit(): void {
    this.getRecordList();
  }

  getRecordList(){
    this._service.getRecords().subscribe(data =>{
      this.recordList = data;
      console.log(this.recordList);
    }, err =>{
      console.log(err);
    })
  }

}

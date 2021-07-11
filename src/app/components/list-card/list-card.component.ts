import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  public isLoading = true;

  constructor(private _service: CreditCardService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fillRecords();
  }

  fillRecords(){
    this.isLoading = true;
    this._service.getRecords().subscribe(data =>{
      this.recordList = data;
      this.isLoading = false;
    }, err =>{
      console.log(err);
      this.isLoading = false;
    })
  }

  deleteRecord(record: CreditCardI){
    this._service.deleteRecord(record.id!).then(
      () => {
        this.toastr.error(`La tarjeta numero ${record.number} se ha eliminado con exito.`, 'Registro Eliminado')
      }, err => {
        console.log(err);
        this.toastr.error(`Oops... ha ocurrido un error`, 'Error')
      }
    )
  }

  updateRecord(record: CreditCardI){
    this._service.addRecordUpdate(record);
  }

}

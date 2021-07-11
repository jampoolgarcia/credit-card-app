import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreditCardI } from 'src/app/model/credit-card';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styles: [
  ]
})
export class FormCardComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public isLoading = false;
  private subscription = new Subscription();
  public title = "Agregar Tarjeta";
  private id: string | undefined;

  constructor(private fb: FormBuilder, 
              private _service: CreditCardService,
              private toastr: ToastrService) {
    this.buildingForm(null);
  }

  ngOnInit(): void{
    this.subscription = this._service.getRecordUpdate()
      .subscribe(record => {
        this.title = 'Editar Tarjeta';
        this.id = record.id;
        this.buildingForm(record);
      }, err => {
        console.log(err);
        this.toastr.error('Oops... ha ocurrido un error al intentar actualizar.', 'Error')
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buildingForm(record: CreditCardI | null): void{
    this.form = this.fb.group({
      holder: [record?.holder, [Validators.required, Validators.minLength(3)]],
      number: [record?.number, [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^([0-9])*$')]],
      expirationDate: [record?.expirationDate, [Validators.required, Validators.minLength(5), Validators.minLength(5), Validators.pattern('(0(?!0)|1(?=[0-2]))[0-9]/[0-9][0-9]')]],
      cvv: [record?.cvv, [Validators.required, Validators.minLength(3), Validators.minLength(3), Validators.pattern('^([0-9])*$')]]
    })
  }        

  onSubmit(): void{

    this.isLoading = true;
    this.form.disable();
    const CARD = this.getFormData();

    if(this.id === undefined){
      this.onSaveRecord(CARD);
      return;
    }
    
    this.onUpdateRecord(CARD);
    
  }

  onSaveRecord(record: CreditCardI): void {
    this._service.addRecord(record).then(()=>{
      this.toastr.success(`La tarjeta numero ${record.number} ya ha sido guardada.`, 'Registro exitoso');
      this.resetForm();
    }, err => {
      this.isLoading = false;
      this.toastr.error(err, 'Opps... Ha ocurrido un error')
      console.log(err);
    })
  }

  onUpdateRecord(record: CreditCardI): void {
    this._service.updateRecord(this.id!, record).then(()=>{
      this.toastr.success(`La tarjeta numero ${record.number} ya ha sido actualizada.`, 'Registro Actualizado');
      this.resetForm();
      this.id = undefined;
      this.title = "Agregar Tarjeta";
    }, err => {
      this.isLoading = false;
      this.toastr.error(err, 'Opps... Ha ocurrido un error al actualizar')
      console.log(err);
    })
  }

  private resetForm(){
    this.isLoading = false;
    this.form.reset();
    this.form.enable();
  }

  getFormData(): CreditCardI {
    const { holder, number, expirationDate, cvv} = this.form.value;
    
    let record: CreditCardI = {
      holder,
      number,
      expirationDate,
      cvv,
      updateDate: new Date(),
    } 

    if(this.id === undefined){
      record.createDate = new Date();
      return record;
    }
    
    return record;

  }

}

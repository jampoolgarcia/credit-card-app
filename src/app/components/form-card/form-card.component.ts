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

  constructor(private fb: FormBuilder, 
              private _service: CreditCardService,
              private toastr: ToastrService) {
    this.buildingForm(null);
  }

  ngOnInit(): void{
    this.subscription = this._service.getRecordUpdate()
      .subscribe(record => {
        console.log(record);
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
    this._service.addRecord(CARD).then(()=>{
      this.toastr.success(`La tarjeta numero ${CARD.number} ya ha sido guardada.`, 'Registro exitoso.');
      this.isLoading = false;
      this.form.reset();
      this.form.enable();
    }, err => {
      this.toastr.error(err, 'Opps... Ha ocurrido un error')
      console.log(err);
    })
  }

  getFormData(): CreditCardI {
    const { holder, number, expirationDate, cvv} = this.form.value;
    return {
      holder,
      number,
      expirationDate,
      cvv,
      createDate: new Date(),
      updateDate: new Date(),
    }
  }

}

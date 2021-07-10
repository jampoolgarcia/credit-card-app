import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardI } from 'src/app/model/credit-card';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styles: [
  ]
})
export class FormCardComponent {

  public form!: FormGroup;
  public isLoading = false;

  constructor(private fb: FormBuilder, 
              private _service: CreditCardService,
              private toastr: ToastrService) {
    this.buildingForm();
  }

  buildingForm(){
    this.form = this.fb.group({
      holder: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^([0-9])*$')]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.minLength(5), Validators.pattern('(0(?!0)|1(?=[0-2]))[0-9]/[0-9][0-9]')]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.minLength(3), Validators.pattern('^([0-9])*$')]]
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

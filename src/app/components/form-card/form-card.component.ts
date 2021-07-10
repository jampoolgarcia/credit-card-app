import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardI } from 'src/app/model/credit-card';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styles: [
  ]
})
export class FormCardComponent implements OnInit {

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildingForm();
  }

  buildingForm(){
    this.form = this.fb.group({
      holder: ['', [Validators.required, Validators.minLength(3)]],
      number: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^([0-9])*$')]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.minLength(5), Validators.pattern('[0-9]+/[0-9]+')]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.minLength(3), Validators.pattern('^([0-9])*$')]]
    })
  }        

  ngOnInit(): void {
  }

  onSubmit(): void{
    const CARD = this.getFormData();
    console.log(CARD);
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

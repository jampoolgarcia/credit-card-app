import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CreditCardI } from '../model/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private firestore: AngularFirestore) { }

  addCard(card: CreditCardI): Promise<any> {
    return this.firestore.collection('credit-card').add(card);
  }
}

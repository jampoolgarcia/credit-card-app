import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCardI } from '../model/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private collection = 'credit-card'

  constructor(private firestore: AngularFirestore) { }

  addRecord(card: CreditCardI): Promise<any> {
    return this.firestore.collection(this.collection).add(card);
  }

  getRecords(): Observable<CreditCardI[]>{
    return this.firestore.collection(this.collection, ref => ref.orderBy('createDate', 'asc')).snapshotChanges()
      .pipe(
        map(data => this.parseData(data))
      );
  }

  private parseData(data: any): CreditCardI[]{
    let list: CreditCardI[] = [];
    data.forEach((element: any)=> {
      list.push({
        id: element.payload.doc.id,
        ...element.payload.doc.data()
      });
    });
    return list;
  } 

}

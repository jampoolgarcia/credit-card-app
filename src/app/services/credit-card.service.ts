import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreditCardI } from '../model/credit-card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private collection = 'credit-card';
  private record = new Subject<CreditCardI>(); 

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

  deleteRecord(id: string): Promise<void>{
    return this.firestore.collection(this.collection).doc(id).delete();
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

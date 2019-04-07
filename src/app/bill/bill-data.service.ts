import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Bill } from './bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillDataService {
  public billListEventEmitter = new EventEmitter<Bill[]>();

  constructor(private http: HttpClient) { }

  getBillList() {
    this.http.get<Bill[]>(environment.restUrl + '/bill').subscribe(
      (bills) => {
        this.billListEventEmitter.emit(bills);
      },
      (error) => console.log(error)
    );
  }

  addBill(bill: Bill) {
    this.http.post<{id: string}>(environment.restUrl + '/bill', bill).subscribe(
      () => {
        this.getBillList();
      }
    );
  }

  deleteBill(billId: string) {
    this.http.delete(environment.restUrl + '/bill/' + billId).subscribe(
      () => {
        this.getBillList();
      });
  }

  updateBill(bill: Bill) {
    this.http.put(environment.restUrl + '/bill/' + bill.id, bill).subscribe(
      () => this.getBillList()
    );
  }

  getBillObservableById(billId: string): Observable<Bill> {
    return this.http.get<Bill>(environment.restUrl + '/bill/' + billId);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillDataService } from '../bill-data.service';

@Component({
  selector: 'app-total-bill',
  templateUrl: './total-bill.component.html',
  styleUrls: ['./total-bill.component.css']
})
export class TotalBillComponent implements OnInit, OnDestroy {
  billListSubscription: any;
  totalIncome: number;
  totalOutcome: number;
  balance: number;

  constructor(private billDataService: BillDataService) { }

  ngOnInit() {
    this.billListSubscription = this.billDataService.billListEventEmitter.subscribe(
      (bills) => {
        let ti = 0;
        let to = 0;
        bills.forEach((ele) => {
          if (ele.type === 'Income') {
            ti += ele.amount;
          } else if (ele.type === 'Outcome') {
            to += ele.amount;
          }
        });
        this.totalIncome = ti;
        this.totalOutcome = to;
        this.balance = ti - to;
      }
    );
  }

  ngOnDestroy() {
    this.billListSubscription.unsubscribe();
  }

}

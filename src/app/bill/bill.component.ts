import { Component, OnDestroy, OnInit } from '@angular/core';

import { Bill } from './bill.model';
import { BillDataService } from './bill-data.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit, OnDestroy {
  billList: Bill[];
  billListSubscription: any;

  constructor(private billDataService: BillDataService) { }

  ngOnInit() {
    this.billListSubscription = this.billDataService.billListEventEmitter.subscribe(
      (billList) => this.billList = billList
    );
    this.billDataService.getBillList();
  }

  ngOnDestroy() {
    this.billListSubscription.unsubscribe();
  }
}

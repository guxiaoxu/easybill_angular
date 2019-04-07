import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Bill } from '../bill.model';
import { BillDataService } from '../bill-data.service';
import { CardDataService } from '../../card/card-data.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent implements OnInit, OnDestroy {
  routeSubscription: any;
  billSubscription: any;
  bill: Bill;
  method: string;
  cardSubscription: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private billDataService: BillDataService,
              private cardDataService: CardDataService) { }

  ngOnInit() {
    this.bill = new Bill(); // init with empty object to avoid undefined issue
    this.routeSubscription = this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.billSubscription = this.billDataService.getBillObservableById(id).subscribe(
          (bill) => {
            this.bill = bill;
            if (this.bill.cardId) {
              this.cardSubscription = this.cardDataService.getCardObservableById(this.bill.cardId).subscribe(
                (card) => this.method = card.displayAlias
              );
            } else {
              this.method = 'CASH';
            }});
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.billSubscription) {
      this.billSubscription.unsubscribe();
    }
    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.billDataService.updateBill(this.bill);
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onBack() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}

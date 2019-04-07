import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Card } from '../../card/card.model';
import { Bill } from '../bill.model';
import { BillDataService } from '../bill-data.service';
import { CardDataService } from '../../card/card-data.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit, OnDestroy {
  addBillForm: FormGroup;
  cardList: Card[];
  cardListSubscription: any;

  constructor(private billDataService: BillDataService,
              private cardDataService: CardDataService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.cardListSubscription = this.cardDataService.cardListEventEmitter.subscribe(
      (cards) => this.cardList = cards
    );
    this.cardDataService.getCardList();

    this.addBillForm = new FormGroup({
      'type': new FormControl(null, Validators.required),
      'billTime': new FormControl(null, Validators.required),
      'cardId': new FormControl(null),
      'amount': new FormControl(null, Validators.required),
      'category': new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    this.cardListSubscription.unsubscribe();
  }

  onSubmit() {
    const newBill: Bill = this.addBillForm.value;
    this.billDataService.addBill(newBill);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

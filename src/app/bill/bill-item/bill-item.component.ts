import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Bill } from '../bill.model';
import { BillDataService } from '../bill-data.service';
import { CardDataService } from '../../card/card-data.service';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent implements OnInit, OnDestroy {
  @Input() bill: Bill;
  method: string;
  cardSubscription: any;

  constructor(private billDataService: BillDataService, private cardDateService: CardDataService) { }

  ngOnInit() {
    if (this.bill.cardId) {
      this.cardSubscription = this.cardDateService.getCardObservableById(this.bill.cardId).subscribe(
        (card) => this.method = card.displayAlias
      );
    } else {
      this.method = 'CASH';
    }
  }

  ngOnDestroy() {
    if (this.cardSubscription) {
      this.cardSubscription.unsubscribe();
    }
  }

  onDelete() {
    if (confirm('Are you sure to delete this bill?')) {
      this.billDataService.deleteBill(this.bill.id);
    }
  }

  getTypeFillClasses(billType: string) {
    return {
      'list-group-item-success': billType === 'Income',
      'list-group-item-warning': billType === 'Outcome'
    };
  }

  getTypeBadgeClasses(billType: string) {
    return {
      'badge-success': billType === 'Income',
      'badge-danger': billType === 'Outcome'
    };
  }

}

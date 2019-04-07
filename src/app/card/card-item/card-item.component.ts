import {Component, Input, OnInit} from '@angular/core';

import { Card } from '../card.model';
import { CardDataService } from '../card-data.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() card: Card;

  constructor(private cardDataService: CardDataService) { }

  ngOnInit() {
    if (this.card.alias === null) {
      this.card.alias = this.card.type;
    }
  }

  onDelete() {
    if (confirm('Are you sure to delete the card ends in ' + this.card.lastDigits + '?')) {
      if (confirm('All bills related to this card will also deleted?')) {
        this.cardDataService.deleteCard(this.card.id);
      }
    }
  }

  getTypeFillClasses(cardType: string) {
    return {
      'list-group-item-success': cardType === 'DEBIT',
      'list-group-item-warning': cardType === 'CREDIT'
    };
  }

  getTypeBadgeClasses(cardType: string) {
    return {
      'badge-success': cardType === 'DEBIT',
      'badge-danger': cardType === 'CREDIT'
    };
  }
}

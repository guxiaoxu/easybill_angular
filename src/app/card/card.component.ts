import { Component, OnDestroy, OnInit } from '@angular/core';

import { Card } from './card.model';
import { CardDataService } from './card-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  cardList: Card[];
  cardListSubscription: any;

  constructor(private cardDataService: CardDataService) { }

  ngOnInit() {
    this.cardListSubscription = this.cardDataService.cardListEventEmitter.subscribe(
      (cardList) => this.cardList = cardList
    );
    this.cardDataService.getCardList();
  }

  ngOnDestroy() {
    this.cardListSubscription.unsubscribe();
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Card } from './card.model';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {
  public cardListEventEmitter = new EventEmitter<Card[]>();

  constructor(private http: HttpClient) { }

  getCardList() {
    this.http.get<Card[]>(environment.restUrl + '/card').subscribe(
      (cards) => {
        this.cardListEventEmitter.emit(cards);
      },
      (error) => console.log(error)
    );
  }

  getCardObservableById(cardId: string): Observable<Card> {
    return this.http.get<Card>(environment.restUrl + '/card/' + cardId);
  }

  addCard(card: Card) {
    this.http.post<{id: string}>(environment.restUrl + '/card', card).subscribe(
      () => {
        this.getCardList();
      }
    );
  }

  deleteCard(cardId: string) {
    this.http.delete(environment.restUrl + '/card/' + cardId).subscribe(
      () => {
        this.getCardList();
      });
  }
}

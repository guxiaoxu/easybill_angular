import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CardDataService } from '../card-data.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  addCardForm: FormGroup;

  constructor(private cardDataService: CardDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.addCardForm = new FormGroup({
      'type': new FormControl(null, [Validators.required]),
      'lastDigits': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      'alias': new FormControl(null, [Validators.maxLength(10)])
    });
  }

  onSubmit() {
    const newCard = this.addCardForm.value;
    this.cardDataService.addCard(newCard);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

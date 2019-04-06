import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  message: string;
  routeSubscription: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.data
      .subscribe(
        (data: Data) => {
          this.message = data['msg'];
        }
      );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}

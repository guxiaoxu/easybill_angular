import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';
import { Session } from '../user/session.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  nickName = '';
  private nameSubscription: any;

  constructor(private authService:  AuthenticationService) { }

  ngOnInit() {
    this.nickName = this.authService.getNickname();
    this.nameSubscription = this.authService.sessionEventEmitter.subscribe(
      (session: Session) => {
        if (session) {
          this.nickName = session.userNickName;
        } else {
          this.nickName = '';
        }
      }
    );
  }

  ngOnDestroy() {
    this.nameSubscription.unsubscribe();
  }

  onSignOut() {
    this.authService.signOut();
  }

}


import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';

import { User } from './user.model';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public session: Session;
  public sessionEventEmitter = new EventEmitter<Session>();
  public authMsgEventEmitter = new EventEmitter<string>();
  public authMsg: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.session = JSON.parse(localStorage.getItem('session'));
    this.sessionEventEmitter.emit(this.session);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== '';
  }

  saveLocalStorage() {
    localStorage.setItem('session', JSON.stringify(this.session));
  }

  signOut() {
    this.http.delete(environment.restUrl + '/user/session').subscribe(
      () => {
        this.session = null;
        this.saveLocalStorage();
        this.sessionEventEmitter.emit(this.session);
        this.router.navigate(['signin']);
      });
  }

  singIn(user: User) {
    this.http.post<Session>(environment.restUrl + '/user/session', user).subscribe(
      (session) => {
        this.session = session;
        this.saveLocalStorage();
        this.sessionEventEmitter.emit(this.session);
        this.authMsg = null;
        this.authMsgEventEmitter.emit(this.authMsg);
        this.router.navigate(['bill']);
        },
      (error) => {
        console.log(error);
        this.authMsg = error.error.message;
        this.authMsgEventEmitter.emit(this.authMsg);
      }
    );
  }

  singUp(user: User) {
    this.http.post<Session>(environment.restUrl + '/user', user).subscribe(
      (session) => {
        this.session = session;
        this.saveLocalStorage();
        this.sessionEventEmitter.emit(this.session);
        this.router.navigate(['bill']);
      },
      (error) => console.log(error)
    );
  }

  checkEmail(email: string) {
    return this.http.get(environment.restUrl + '/user/checkEmail?email=' + email);
  }

  getToken(): string {
    if (this.session && this.session.sessionId) {
      return this.session.sessionId.token;
    }
    return '';
  }

  getNickname(): string {
    if (this.session) {
      return this.session.userNickName;
    }
    return '';
  }
}

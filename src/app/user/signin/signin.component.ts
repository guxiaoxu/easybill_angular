import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {User} from '../user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Session} from '../session.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  authMsg = '';
  authMsgSubscription: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
    this.authMsgSubscription = this.authService.authMsgEventEmitter.subscribe(
      (authMsg: string) => this.authMsg = authMsg
    );
    this.signupForm.valueChanges.subscribe(
      () => this.authMsg = ''
    );
  }

  ngOnDestroy() {
    this.authMsgSubscription.unsubscribe();
  }

  onSubmit() {
    console.log(this.signupForm);
    const user: User = this.signupForm.value;
    this.authService.singIn(user);
  }
}

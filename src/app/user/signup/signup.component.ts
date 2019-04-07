import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.existingEmail.bind(this)),
      'nickname': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(10)])
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    const user: User = this.signupForm.value;
    this.authService.singUp(user);
  }

  existingEmail(control: FormControl): Promise<any> | Observable<any> {
    console.log(this);
    return this.authService.checkEmail(control.value).pipe(map(
      (data: {result: boolean}) => {
        return data.result ? {existingEmail: true} : null;
      }
    ));
  }
}

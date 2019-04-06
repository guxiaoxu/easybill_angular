// base modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// app modules
import { AppComponent } from './app.component';
import { AppRouteModule } from './app-routing.module';
// auth services
import { AuthenticationService } from './user/authentication.service';
import { AuthGuardService } from './user/auth-guard.service';
import { AuthInterceptor } from './user/auth.interceptor';
// app components
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { BillComponent } from './bill/bill.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BillComponent,
    MessageComponent,
    SignupComponent,
    SigninComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouteModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [AuthenticationService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

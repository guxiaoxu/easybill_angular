// base modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CardItemComponent } from './card/card-item/card-item.component';
import { AddCardComponent } from './card/add-card/add-card.component';
import { BillItemComponent } from './bill/bill-item/bill-item.component';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { EditBillComponent } from './bill/edit-bill/edit-bill.component';
// data services
import { CardDataService } from './card/card-data.service';
import { BillDataService } from './bill/bill-data.service';
import { TotalBillComponent } from './bill/total-bill/total-bill.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BillComponent,
    MessageComponent,
    SignupComponent,
    SigninComponent,
    CardComponent,
    CardItemComponent,
    AddCardComponent,
    BillItemComponent,
    AddBillComponent,
    EditBillComponent,
    TotalBillComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRouteModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    CardDataService,
    BillDataService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, deps: [AuthenticationService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

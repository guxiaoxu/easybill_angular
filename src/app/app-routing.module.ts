import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { MessageComponent } from './message/message.component';
import { SignupComponent } from './user/signup/signup.component';
import { AuthGuardService } from './user/auth-guard.service';
import { SigninComponent } from './user/signin/signin.component';
import { CardComponent } from './card/card.component';
import { AddCardComponent } from './card/add-card/add-card.component';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { EditBillComponent } from './bill/edit-bill/edit-bill.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'bill', pathMatch: 'full', canActivate: [AuthGuardService]},
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'card', pathMatch: 'full', component: CardComponent, canActivate: [AuthGuardService]},
  { path: 'card/add', pathMatch: 'full', component: AddCardComponent, canActivate: [AuthGuardService]},
  { path: 'bill', pathMatch: 'full', component: BillComponent, canActivate: [AuthGuardService]},
  { path: 'bill/add', pathMatch: 'full', component: AddBillComponent, canActivate: [AuthGuardService]},
  { path: 'bill/:id/edit', pathMatch: 'full', component: EditBillComponent, canActivate: [AuthGuardService]},
  { path: 'not-found', component: MessageComponent, data: { msg: 'Request resource not found!'} },
  { path: '**', redirectTo: 'not-found' }
];

export const AppRouteModule = RouterModule.forRoot(appRoutes);

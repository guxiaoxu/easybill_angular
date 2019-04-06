import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { MessageComponent } from './message/message.component';
import { SignupComponent } from './user/signup/signup.component';
import { AuthGuardService } from './user/auth-guard.service';
import { SigninComponent } from './user/signin/signin.component';
import { CardComponent } from './card/card.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'bill', pathMatch: 'full', canActivate: [AuthGuardService]},
  /*{ path: 'singu', children: [
    { path: 'signup', component: MessageComponent, pathMatch: 'full', data: { msg: 'Please select a recipe!'} }
    { path: 'new', component: RecipeEditComponent},
    { path: ':index', component: RecipeDetailComponent },
    { path: ':index/edit', component: RecipeEditComponent},
  ] },*/
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'bill', component: BillComponent, canActivate: [AuthGuardService]},
  { path: 'card', component: CardComponent, canActivate: [AuthGuardService]},
  { path: 'not-found', component: MessageComponent, data: { msg: 'Request resource not found!'} },
  { path: '**', redirectTo: 'not-found' }
];

export const AppRouteModule = RouterModule.forRoot(appRoutes);

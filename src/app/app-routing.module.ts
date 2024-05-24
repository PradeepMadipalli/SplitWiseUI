import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettleUpComponent } from './settleup/settleup.component';
import { GroupsComponent } from './groups/groups.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { DetailsGroupComponent } from './details-group/details-group.component';
import { ExpensedetailsComponent } from './expensedetails/expensedetails.component';
import { FriendComponent } from './friend/friend.component';
import { InvitationComponent } from './invitation/invitation.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settleup', component: SettleUpComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'expenses/:id/:expid', component: ExpensesComponent },
  { path: 'creategroup/:id', component: CreategroupComponent },
  { path: 'group/:id', component: DetailsGroupComponent },
  { path: 'expensedetails', component: ExpensedetailsComponent },
  { path: 'friend', component: FriendComponent },
  { path: 'EditFriend/:id', component: FriendComponent },
  { path: 'invitation/:id', component: RegisterComponent },
  { path: 'details', component: DetailsComponent },
  { path: '', redirectTo: 'groups', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

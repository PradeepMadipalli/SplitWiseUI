import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupService } from '../services/group.service';
import { AuthInterceptor } from '../services/auth.interceptor';
import { SettleUpComponent } from './settleup/settleup.component';
import { GroupsComponent } from './groups/groups.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DetailsGroupComponent } from './details-group/details-group.component';
import { ExpensedetailsComponent } from './expensedetails/expensedetails.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavComponent } from './nav/nav.component';
import { BelownavComponent } from './belownav/belownav.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FriendComponent } from './friend/friend.component';
import { InvitationComponent } from './invitation/invitation.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SettleUpComponent,
    GroupsComponent,
    ExpensesComponent,
    CreategroupComponent,
    DetailsGroupComponent,
    ExpensedetailsComponent,
    NavComponent,
    BelownavComponent,
    FriendComponent,
    InvitationComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [AuthService, ConfigService, provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideToastr(), GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }

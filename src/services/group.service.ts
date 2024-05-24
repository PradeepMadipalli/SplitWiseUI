import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditGroupDetails, GetExpenseDetailsRequest, GetInvitationRequest, GetTransactionRequest, InvitationRequest, RequestExpense, RequestGroup, RequesteditGroup, SettleupRequest } from '../app/models/members.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  requesteditGroup: RequesteditGroup;
  private apiUrl: string = 'https://localhost:7245/api'
  constructor(private config: ConfigService, private http: HttpClient) {
    this.config.getConfig().subscribe(config => {
      // this.apiUrl = config.apiUrl;
    });
  }
  createGroups(sendgroupdata: RequestGroup): Observable<any> {
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(`${this.apiUrl}/creategroup`, sendgroupdata, httpOptionss);
  }
  GetGroups(): Observable<any> {
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get<any>(`${this.apiUrl}/GetGroups`);
  }
  GetCategories(): Observable<any> {
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get<any>(`${this.apiUrl}/getCategories`);
  }
  geteditgroups(groupid: any): Observable<any> {
    this.requesteditGroup = {
      groupid: groupid
    }
    return this.http.post<any>(`${this.apiUrl}/getEditGroup`, this.requesteditGroup);
  }
  Editgroupdetails(sendgroupdetails: RequestGroup) {
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(`${this.apiUrl}/CreateGroup`, sendgroupdetails);
  }
  GetCurrency() {
    return this.http.get<any>(`${this.apiUrl}/GetCurrency`);
  }
  createExpense(expensedetails: RequestExpense) {
    return this.http.post<any>(`${this.apiUrl}/createexpense`, expensedetails);
  }
  GetExpenses(getexpensedts: GetExpenseDetailsRequest) {
    return this.http.post<any>(`${this.apiUrl}/getexpensesbyGroupid`, getexpensedts);
  }
  editExpenseByexpid(getexpenseByExpid: GetExpenseDetailsRequest) {
    return this.http.post<any>(`${this.apiUrl}/getexpensesbyGidandExpId`, getexpenseByExpid);
  }
  GetTransAction(getTransActionbygdi: GetTransactionRequest) {
    return this.http.post<any>(`${this.apiUrl}/gettransactionsbygroupid`, getTransActionbygdi);
  }
  Sendinvitation(sendinvitationdetails: InvitationRequest) {
    return this.http.post<any>(`${this.apiUrl}/createinvitation`, sendinvitationdetails);
  }
  GetInvitation(invitationrequest: GetInvitationRequest) {
    return this.http.post<any>(`${this.apiUrl}/GetFriendInvi`, invitationrequest);
  }
  GetFriendsList() {
    return this.http.get<any>(`${this.apiUrl}/getfriendslist`);
  }
  getTotalAmountbyuserid() {
    return this.http.get<any>(`${this.apiUrl}/gettotalamount`);
  }
  getTotalAmountDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/gettotalamountdetails`);
  }
  insertSettleUp(insertSettleup: SettleupRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertsettleup`, insertSettleup);
  }
  getactivities():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getactivities`);
  }
}

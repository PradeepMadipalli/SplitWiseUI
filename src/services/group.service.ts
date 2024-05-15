import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditGroupDetails, RequestGroup, RequesteditGroup } from '../app/models/members.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  requesteditGroup:RequesteditGroup;
  private apiUrl: string;
  constructor(private config: ConfigService, private http: HttpClient) {
    this.config.getConfig().subscribe(config => {
      this.apiUrl = config.apiUrl;
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
  GetCategories():Observable<any>{
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get<any>(`${this.apiUrl}/getCategories`);
  }
  geteditgroups(groupid:any):Observable<any>{
    this.requesteditGroup={
      groupid:groupid
    }
    return this.http.post<any>(`${this.apiUrl}/getEditGroup`,this.requesteditGroup);
  }
  Editgroupdetails(sendgroupdetails:EditGroupDetails){
    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(`${this.apiUrl}/editgroupdetails`,sendgroupdetails);
  }
}
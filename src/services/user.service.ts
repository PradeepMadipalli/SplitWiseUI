import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private apiUrl: string;
  private apiUrl: string='https://localhost:7245/api'
  constructor(private config:ConfigService,private http:HttpClient) { 
    this.config.getConfig().subscribe(config => {
      this.apiUrl = config.apiUrl;
  });

  }
  getUser(): Observable<any> {

    const httpOptionss = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      })
    };
    return this.http.get<any>(`${this.apiUrl}/users`);
  }
  
}

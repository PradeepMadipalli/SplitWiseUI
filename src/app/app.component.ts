import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SplitWise';
  year: number;
  currentUserName: string;
  isBoolNav: boolean = false;
  token: string;

  constructor(private config: ConfigService) {

  }
  ngOnInit(): void {
    const d = new Date();
    this.year = d.getFullYear();
    this.currentUserName = this.config.getCuurectusername();
    this.token = this.config.getToken();
    if (this.token != undefined || this.token != null) {
      if (!this.isBoolNav) {
        this.isBoolNav = !this.isBoolNav
      }
    }
  }
  logout() {
    this.config.logout();
    if (this.isBoolNav) {
      this.isBoolNav = !this.isBoolNav
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  currentUserName:string;
  groupid:string='22f6b430-5537-4b09-9b01-f3a03cec3e03'
  constructor(private config: ConfigService) {

  }
  ngOnInit(): void {

    this.currentUserName = this.config.getCuurectusername();

  }
  logout() {
    this.config.logout();


  }
}

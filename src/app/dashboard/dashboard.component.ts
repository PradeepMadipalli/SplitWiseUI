import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  users: any[];
  currentUser: string;


  constructor(private config:ConfigService,
    private userservice:UserService,
    private toastr:ToastrService) {
    
  }
  ngOnInit(): void {
    this.getUsers();
  }
  logout() {
    this.config.logout();
  }
  getUsers() {
    this.userservice.getUser().subscribe(
      (response: any) => {
        this.users = response.users;
        console.log(this.users);
      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
}

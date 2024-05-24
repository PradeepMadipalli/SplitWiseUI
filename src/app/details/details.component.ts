import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  expensedetails: any[] = [];
  getUserss: any[] = [];
  getgroups: any[] = [];
  getfriends: any[] = [];
  currentUser:any;
  currentUserName:string;
  constructor(public groupservice: GroupService, public userservice: UserService ,public config:ConfigService) {

  }
  ngOnInit(): void {
    this.getTotalAmountDetailsss();
    this.getUsers();
    this.getGroups();
    this.currentUser = this.config.getCuurectuserid();
    this.currentUserName = this.config.getCuurectusername();
    this.getFriendslist();
  }
  getTotalAmountDetailsss() {
    this.groupservice.getTotalAmountDetails().subscribe(response => {
      this.expensedetails = response;
      console.log(this.expensedetails);
    })
  }
  getUsers() {
    this.userservice.getUser().subscribe(response => {
      this.getUserss = response;
    })
  }
  getGroups() {
    this.groupservice.GetGroups().subscribe(response => {
      this.getgroups = response;
    })
  }
  getFriendslist() {
    this.groupservice.GetFriendsList().subscribe(response => {
      console.log(response);
      this.getfriends = response;
      console.log(this.getfriends);
    })
  }


  GetPaidBy(id: string) {
    if (id == this.currentUser) {
      return "You";
    } else {
      if (this.getfriends.length != 0) {
        const mem = this.getfriends.find(a => a.userId == id);

        return mem.userName;
      }
      return "user";
    }

  }
  GetParticipateByID(id: string) {

    if (id == this.currentUser) {
      return "You";
    } else {
      if (this.getfriends.length != 0) {
        const mem = this.getfriends.find(a => a.userId == id);

        return mem.userName;
      }
      return "user";
    }

  }
  GetGroupByid(id: string) {
    if (this.getgroups.length != 0) {
      const mem = this.getgroups.find(a => a.groupId == id);
      return mem.groupName;
    }
    return "No Group";
  }
}



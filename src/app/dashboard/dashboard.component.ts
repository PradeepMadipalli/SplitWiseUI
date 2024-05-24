import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Categories, EditGroupDetails, GetInvitationRequest, GetUsers, RequestGroup, RequesteditGroup, members } from '../models/members.model';
import { GroupService } from '../../services/group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  users: any[];
  currentUser: string;
  members: members[] = [];
  addmember: members;
  sendgroupdatas: RequestGroup;
  sendgroupdetails: EditGroupDetails;
  groupname: string;
  groupcategory: string;
  groupSimplifyDebtsvalue: boolean;
  grouptextarea: string;
  GroupDetails: any[] = [];
  currentUserName: string;
  datacategories: any[];
  editzgroupdetails: any[];
  isbuttonedit: boolean = false;
  Groudid: string;
  year: number;
  getinvitionRequest: GetInvitationRequest;
  getfriends: any[] = [];
  getTotalAmount: any[] = [];
  totalAmount: string;
  ownAmount: string;
  OwnedAmount: string;
  Amount: string;
  useremail: string;
  userid: string;
  username: string;
  getActivity: any[];


  constructor(private config: ConfigService,
    private userservice: UserService,
    private toastr: ToastrService,
    private groupservice: GroupService) {


  }
  ngOnInit(): void {
    this.getUsers();
    this.getGroups();
    this.currentUser = this.config.getCuurectuserid();
    this.currentUserName = this.config.getCuurectusername();
    this.getFriendslist();
    this.gettotalamountbyuserid();
    this.GetActivities();

  }
  logout() {
    this.config.logout();
  }
  getUsers() {
    this.userservice.getUser().subscribe(
      (response: any) => {
        this.users = response.users;

      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }



  getGroups() {
    this.groupservice.GetGroups().subscribe(
      (response: any) => {
        console.log(response);
        this.GroupDetails = response;
        console.log(response);
      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }


  getFriendslist() {
    this.groupservice.GetFriendsList().subscribe(response => {
      console.log(response);
      this.getfriends = response;
      console.log(this.getfriends);
    })
  }
  gettotalamountbyuserid() {
    this.groupservice.getTotalAmountbyuserid().subscribe(response => {
      console.log(response);
      this.totalAmount = response.totalAmount;
      this.ownAmount = response.oweAmount;
      this.OwnedAmount = response.owedAmount;

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
    if (this.GroupDetails.length != 0) {
      const mem = this.GroupDetails.find(a => a.groupId == id);
      return mem.groupName;
    }
    return "No Group";
  }
  GetActivities() {
    this.groupservice.getactivities().subscribe(data => {
      this.getActivity = data;
      console.log(this.getActivity + "activity");
    })
  }
}

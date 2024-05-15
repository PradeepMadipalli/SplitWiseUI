import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Categories, EditGroupDetails, RequestGroup, RequesteditGroup, members } from '../models/members.model';
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
  sendgroupdetails:EditGroupDetails;
  groupname: string;
  groupcategory: string;
  groupSimplifyDebtsvalue: string;
  grouptextarea: string;
  GroupDetails: any[] = [];
  currentUserName: string;
  datacategories: any[];
  editzgroupdetails:any[];
  isbuttonedit:boolean=false;
 

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
  getmembers() {
    this.getGroups()
    this.getUsers();
    this.getcategories();
  }
  addmembers(user: any) {
    this.addmember = {
      userId: user.userId,
      userEmail: user.userEmail,
      userName: user.userName
    }
    if (this.members == undefined || this.members == null) {
      this.members.push(this.addmember);
      console.log(this.addmember + "first")
    }

    else {
      console.log(this.addmember)
      this.members.push(this.addmember);
    }
  }
  createGroup() {
    this.sendgroupdatas = {
      GroupName: this.groupname,
      Userlist: JSON.stringify(this.members),
      UserId: this.currentUser,
      Category: this.groupcategory,
      SimplifyDebts: this.groupSimplifyDebtsvalue,
      Comments: this.grouptextarea
    }
    this.groupservice.createGroups(this.sendgroupdatas).subscribe(
      (response: any) => {
        //console.log(response);
      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
  getGroups() {
    this.groupservice.GetGroups().subscribe(
      (response: any) => {
        //console.log(response);
        this.GroupDetails = response;
      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
  editGroup(groupid: any) {
    console.log(groupid);
    this.groupservice.geteditgroups(groupid).subscribe(response => {
      this.groupname=response.groupName;
      this.members=response.usersGroups;
      console.log(response);
      this.isbuttonedit=!this.isbuttonedit;
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
  }
  getcategories() {
    this.groupservice.GetCategories().subscribe(response => {
      console.log(response);
      this.datacategories = response;
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
  }
  editgroupdetails(){
   this.sendgroupdetails={
    groupId:null,
    groupName:null,
    Category:null,
    SimplifyDebts:null,
    Comments:null
   }
    this.groupservice.Editgroupdetails(this.sendgroupdetails).subscribe(response => {
      console.log(response);
      this.editzgroupdetails = response;
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
  }
}

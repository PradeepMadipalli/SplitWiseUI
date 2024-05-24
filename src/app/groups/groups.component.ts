import { Component, OnInit } from '@angular/core';
import { EditGroupDetails, RequestGroup, members } from '../models/members.model';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent implements OnInit {
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

  constructor(private config: ConfigService,
    private userservice: UserService,
    private toastr: ToastrService,
    private groupservice: GroupService) {
    const d = new Date();

  }
  ngOnInit(): void {
    this.getUsers();
    this.getGroups();
    this.getcategories();
    this.currentUser = this.config.getCuurectuserid();


  }

  getUsers() {
    this.userservice.getUser().subscribe(data=>{

    }
      // (response: any) => {
      //   this.users = response.users;

      // },
      // (error) => {
      //   this.toastr.error('Error fetching data:', error);
      // }
    );
  }
  getmembers() {
    this.getGroups()
    this.getUsers();

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
  CreateAndEditGroup() {
    if (this.isbuttonedit) {
      this.editgroupdetails();
      this.isbuttonedit = !this.isbuttonedit;
    } else {
      this.createGroup();
    }
  }

  createGroup() {
    this.sendgroupdatas = {
      GroupId:this.Groudid,
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
    this.Groudid = groupid;
    this.groupservice.geteditgroups(groupid).subscribe(response => {
      this.groupname = response.groupName;
      this.members = response.usersGroups;
      console.log(response);
      if (!this.isbuttonedit) {
        this.isbuttonedit = !this.isbuttonedit;
      }

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
  editgroupdetails() {
    this.sendgroupdatas = {
      GroupId:this.Groudid,
      GroupName: this.groupname,
      Userlist: JSON.stringify(this.members),
      UserId: this.currentUser,
      Category: this.groupcategory,
      SimplifyDebts: this.groupSimplifyDebtsvalue,
      Comments: this.grouptextarea
    }
    this.groupservice.Editgroupdetails(this.sendgroupdatas).subscribe(response => {
      console.log(response);
      this.editzgroupdetails = response;
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
  }

}

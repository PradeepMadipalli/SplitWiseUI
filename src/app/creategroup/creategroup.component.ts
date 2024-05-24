import { Component, OnInit } from '@angular/core';
import { EditGroupDetails, GetExpenseDetailsRequest, RequestGroup, members } from '../models/members.model';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrl: './creategroup.component.scss'
})
export class CreategroupComponent implements OnInit {
  users: any[] = [];
  currentUser: string;
  members: members[] = [];
  addmember: members;
  sendgroupdatas: RequestGroup;
  sendgroupdetails: EditGroupDetails;
  groupname: string;
  groupcategory: string = '-1';
  groupSimplifyDebtsvalue: boolean = false;
  grouptextarea: string;
  GroupDetails: any[] = [];
  currentUserName: string;
  currentUserEmail: string;
  datacategories: any[];
  editzgroupdetails: any[];
  isbuttonedit: boolean = false;
  Groudid: string;
  expid: string;
  year: number;
  myForm: FormGroup;
  getExpenseByexpid: GetExpenseDetailsRequest;
  userEmail: string;


  constructor(private config: ConfigService,
    private userservice: UserService,
    private toastr: ToastrService,
    private groupservice: GroupService, private route: ActivatedRoute, private router: Router, private formbuilder: FormBuilder) {
    const d = new Date();
    this.year = d.getFullYear();


  }
  ngOnInit(): void {
    this.currentUser = this.config.getCuurectuserid();
    this.getUsers();
    this.getGroups();
    this.getcategories();

    this.currentUserName = this.config.getCuurectusername();
    this.currentUserEmail = this.config.getCuurectuseremail();
    this.Groudid = this.route.snapshot.params['id'];
    this.userEmail = this.getEmailID(this.currentUser);

    if (this.Groudid != "0") {
      this.editGroup(this.Groudid);
    } else {
      this.addmember = {
        userId: this.currentUser,
        userEmail: this.currentUserEmail,
        userName: this.currentUserName
      }

      this.members.push(this.addmember);

    }
  }
  logout() {
    this.config.logout();
  }
  getUsers() {
    this.userservice.getUser().subscribe(
      (response: any) => {
        this.users = response.users;
        this.userEmail = this.getEmailID(this.currentUser);
        console.log(this.users[0].userEmail + "getusers");
        console.log(this.userEmail);

      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
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
    if (this.Groudid == "0") {
      this.Groudid = null;
    }
    if (this.isbuttonedit) {
      console.log("Edit")
      this.editgroupdetails();
      this.isbuttonedit = !this.isbuttonedit;
    } else {
      console.log("Create")
      this.createGroup();
    }
  }

  createGroup() {

    this.sendgroupdatas = {
      GroupId: this.Groudid,
      GroupName: this.groupname,
      Userlist: JSON.stringify(this.members),
      UserId: this.currentUser,
      Category: this.groupcategory,
      SimplifyDebts: this.groupSimplifyDebtsvalue,
      Comments: this.grouptextarea
    }
    this.groupservice.createGroups(this.sendgroupdatas).subscribe(
      (response: any) => {
        this.toastr.success('Group Created Successfully');
        this.router.navigate(['/groups']);

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
      this.grouptextarea = response.comments;
      this.groupcategory = response.category;
      this.groupSimplifyDebtsvalue = response.simplifyDebts;

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

    if (this.groupSimplifyDebtsvalue == null) {
      this.groupSimplifyDebtsvalue = false
    }


    this.sendgroupdatas = {
      GroupId: this.Groudid,
      GroupName: this.groupname,
      Userlist: JSON.stringify(this.members),
      UserId: this.currentUser,
      Category: this.groupcategory,
      SimplifyDebts: this.groupSimplifyDebtsvalue,
      Comments: this.grouptextarea
    }
    console.log(this.sendgroupdatas + "edit");
    this.groupservice.Editgroupdetails(this.sendgroupdatas).subscribe(response => {
      console.log(response);
      this.editzgroupdetails = response;
      this.toastr.success('Group updated Successfully');
      this.router.navigate(['/groups']);

    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
  }

  getEmailID(id: any) {
    if (this.users.length != 0) {
      const user = this.users.find(a => a.userId == id);
      return user.userEmail
    }
    return null;
  }

}


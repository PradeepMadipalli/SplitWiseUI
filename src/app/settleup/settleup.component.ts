import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { User } from '../../shared/models/user';
// import { DataService } from '../../shared/services/data.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Settlement } from '../../shared/models/settlement';
// import { Activity } from '../../shared/models/activity';
// import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { of } from 'rxjs';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { GetUserById, SettleupRequest } from '../models/members.model';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settleup.component.html',
  styleUrls: ['./settleup.component.scss']
})
export class SettleUpComponent implements OnInit {


  payer:any='-1';
  payee:any="-1";
  group:any="-1";
  amount:any;
  listOfUsers: string[];
  getfriendss: any;
  GroupDetails: any;
  settleuprequest:SettleupRequest;
  currentUserId:any;
  date:Date=new Date();
 

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router,
     public groupservice: GroupService,public toastr:ToastrService,
     public configservice:ConfigService,public userservice:UserService) {
    // this.friends = [];
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.activity = null;
    // this.settlement = null;
    // this.friends = this.route.snapshot.data.resolvedData.friends;
    // this.friends.push(this.currentUser);
    // this.listOfUsers = [];
    // console.log(JSON.stringify(this.friends));
  }


  ngOnInit() {
    this.getfriendsList();
    this.getGroups();
    this.currentUserId=this.configservice.getCuurectuserid();
  }
  async loadPaid() {
    // console.log(this.expense.groupId);
    // this.equalShare = [];
    // if (this.expense.groupId !== undefined && this.expense.groupId > 0) {
    //   // await this.dataService.getGroupMembers(this.expense.groupId).then(
    //   //   (k) => {
    //   //     this.paidBy = k.members.filter(k => k.id !== this.currentUser.id);
    //   //     this.expenseBetween = k.members.filter(k => k.id !== this.currentUser.id);
    //   //     this.isIndividual = false;
    //   //   }
    //   // )
    // } else {
    //   this.paidBy = this.friends;
    //   this.expenseBetween = this.friends;
    //   this.isIndividual = true;
    // }
  }
  onPaidByChange() {
    // console.log(this.payer.payerId);
  }
  getfriendsList() {
    this.groupservice.GetFriendsList().subscribe(response => {
      this.getfriendss = response;
    })
  }
  getGroups() {
    this.groupservice.GetGroups().subscribe(
      (response: any) => {
        this.GroupDetails = response;
      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
  InsertSettleUp(){
  this.settleuprequest={
    PayerId:this.payer,
    PayeeId:this.payee,
    GroupId:this.group,
    Amount:this.amount,
    CreaqtedBy:this.currentUserId,
    CreaqtedDate:this.date.toString(),
  }
  console.log(this.settleuprequest);
  this.groupservice.insertSettleUp(this.settleuprequest).subscribe(response=>{
  })
  }
}
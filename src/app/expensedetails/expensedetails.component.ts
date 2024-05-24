import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GetExpenseDetailsRequest } from '../models/members.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expensedetails',
  templateUrl: './expensedetails.component.html',
  styleUrl: './expensedetails.component.scss'
})
export class ExpensedetailsComponent implements OnInit{
  getExpensebyGroupId: GetExpenseDetailsRequest;
  getExpenseDetails: any[]=[];
  expensedetails: any[] = [];
  getUserss: any[] = [];
  getgroups: any[] = [];
  getfriends: any[] = [];
  currentUser:any;
  currentUserName:string;
  

  constructor(public groupservice:GroupService,
    public toastr:ToastrService, public route:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.getTotalAmountDetailsss();
  }
  getTotalAmountDetailsss() {
    this.groupservice.getTotalAmountDetails().subscribe(response => {
      this.expensedetails = response;
      console.log(this.expensedetails);
    })
  }
  GetExpenses(groupid: any) {
    this.getExpensebyGroupId = {
      groupId: groupid,
      expId: null
    }
    console.log(this.getExpensebyGroupId);
    this.groupservice.GetExpenses(this.getExpensebyGroupId).subscribe(response => {

      this.getExpenseDetails = response;
      console.log(response);
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
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

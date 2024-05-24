import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from '../../services/group.service';
import { GetExpenseDetailsRequest, GetTransactionRequest } from '../models/members.model';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-details-group',
  templateUrl: './details-group.component.html',
  styleUrl: './details-group.component.scss'
})
export class DetailsGroupComponent implements OnInit {
  Groudid: any;
  groupname: any;
  members: any[] = [];
  createdDate: Date;
  getExpensebyGroupId: GetExpenseDetailsRequest;
  getExpenseDetails: any[] = [];
  getTransactionDetails: any[] = [];
  gettransactionbyGid: GetTransactionRequest;
  currentUser: any;
  constructor(private route: ActivatedRoute, private toastr: ToastrService, private groupservice: GroupService, public config: ConfigService) {
  }
  ngOnInit(): void {
    this.Groudid = this.route.snapshot.params['id'];
    this.editGroup(this.Groudid);
    this.GetExpenses(this.Groudid);
    this.GetTransAction(this.Groudid);
    this.currentUser = this.config.getCuurectuserid();
  }
  editGroup(groupid: any) {
    console.log(groupid);
    this.Groudid = groupid;
    this.groupservice.geteditgroups(groupid).subscribe(response => {
      this.groupname = response.groupName;
      this.members = response.usersGroups;
      this.createdDate = response.createdDate
      console.log(this.members);
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
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
      // this.groupname = response.groupName;
      // this.members = response.usersGroups;
      // this.createdDate = response.createdDate
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
  }
  GetPaidBy(id: string) {
    if (this.members.length != 0) {
      const mem = this.members.find(a => a.userId == id);

      return mem.userName;
    }
    return "user";
  }
  GetTransAction(groupid: any) {
    this.gettransactionbyGid = {
      GroupId: groupid
    }
    console.log(this.getExpensebyGroupId);
    this.groupservice.GetTransAction(this.gettransactionbyGid).subscribe(response => {
      this.getTransactionDetails = response;
      console.log(response);
    }, (error) => {
      this.toastr.error('Error fetching data:', error);
    }
    );
  }
  GetPaidBytransdi(id: string) {
    if (this.Groudid == id) {
      return "this Group " + this.groupname;
    }
    else if (this.currentUser == id) {
      return "You";
    } else {
      if (this.members.length != 0) {
        const mem = this.members.find(a => a.userId == id);

        return mem.userName;
      }
    }
  }
}

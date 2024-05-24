import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupService } from '../../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { GetExpenseDetailsRequest, RequestExpense } from '../models/members.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {

  modalRef?: BsModalRef;
  groupId: any;
  usergroup: any[] = [];
  checkeduser: any[] = [];
  GroupDetails: any[] = [];
  currency: any[] = [];
  equlity: any = 'equlity';
  exactamount: any = 'exactamount';
  percentage: any = 'percentage';
  isboolequlity: boolean = false;
  isboolexactamount: boolean = false;
  isboolpercentage: boolean = false;
  textboxValues: any[] = [];
  textquality: any = "400";
  expensesname: string;
  currencyselect: string = '-1';
  amount: any;
  SpiltBy: any;
  datepicker: Date;
  paidby: string = '-1';
  include: any;
  groupselect: string;
  notes: string;
  expid: any = null;
  userList: any[] = [];
  GetParticipate: any[] = [];
  expensesdata: RequestExpense;
  amountAlert: boolean = false;
  getExpenseByexpid: GetExpenseDetailsRequest;
  expId: string;


  constructor(private modalService: BsModalService, private groupservice: GroupService,
    private toastr: ToastrService, public route: ActivatedRoute, public router: Router) {


  }
  ngOnInit(): void {
    this.getCurrency();
    this.getGroups();
    this.groupId = this.route.snapshot.params['id'];
    this.expId = this.route.snapshot.params['expid'];
    this.equlity= 'equlity';
    this.exactamount = 'exactamount';
    this.percentage = 'percentage';
    if (this.groupId != "0" && this.expId == "0") {
      this.getGroupofusers(this.groupId);
    } else {
      this.getGroupofusers(this.groupId);
      this.editExpenseByexpid(this.groupId, this.expId);
    }
  }
  openModal(template: TemplateRef<void>, shareTemplte: any) {
    if (this.checkeduser.length == 0) {
      this.toastr.error('Validation:', "Select User");
    } else if (this.amount == undefined || this.amount == null) {
      this.amountAlert = !this.amountAlert;
    }
    else {
      if (this.equlity == shareTemplte) {
        this.isequality();
      } else if (this.exactamount == shareTemplte) {
        this.isexacttamout();
      } else {
        this.ispercentage();
      }
      this.amount = this.amount;
      this.modalRef = this.modalService.show(template);
    }


  }
  getGroupofusers(groupid: any) {
    this.groupservice.geteditgroups(groupid).subscribe(data => {
      console.log(data);
      this.usergroup = data.usersGroups;
      ;
    })
  }
  Includechanged(user: any) {
    const usersindex = this.checkeduser.findIndex(u => u.userId == user.userId)
    console.log(usersindex)
    if (usersindex != -1) {
      this.checkeduser.splice(usersindex, 1);
    } else {
      this.checkeduser.push(user);
    }
    console.log(this.checkeduser + "checked");

  }
  getGroups() {
    this.groupservice.GetGroups().subscribe(
      (response: any) => {
        console.log(response + "groups")
        this.GroupDetails = response;
      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
  getCurrency() {
    this.groupservice.GetCurrency().subscribe(
      (response: any) => {
        this.currency = response;
      },
      (error) => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
  isequality() {
    this.SpiltBy = this.equlity;
    this.textboxValues = [];
    if (!this.isboolequlity) {
      this.isboolequlity = !this.isboolequlity
    }
    if (this.isboolexactamount) {
      this.isboolexactamount = !this.isboolexactamount
    }
    if (this.isboolpercentage) {
      this.isboolpercentage = !this.isboolpercentage
    }
    this.textquality = (this.amount / this.checkeduser.length).toString();
    if (this.checkeduser.length > 0) {
      this.checkeduser.forEach(x => {
        this.textboxValues.push(this.textquality);
      })
    }
  }
  isexacttamout() {
    this.SpiltBy = this.exactamount;
    this.textboxValues = [];
    if (this.isboolequlity) {
      this.isboolequlity = !this.isboolequlity
    }
    if (!this.isboolexactamount) {
      this.isboolexactamount = !this.isboolexactamount
    }
    if (this.isboolpercentage) {
      this.isboolpercentage = !this.isboolpercentage
    }

  }
  ispercentage() {
    this.SpiltBy = this.percentage;
    this.textboxValues = [];
    if (this.isboolequlity) {
      this.isboolequlity = !this.isboolequlity
    }
    if (this.isboolexactamount) {
      this.isboolexactamount = !this.isboolexactamount
    }
    if (!this.isboolpercentage) {
      this.isboolpercentage = !this.isboolpercentage
    }
  }
  onsavetemplte() {
    console.log(this.textboxValues);
  }
  createexpensedetails() {
    this.expensesdata = {
      expid: this.expId,
      groupId: this.groupId,
      Name: this.expensesname,
      Amount: this.amount,
      Currency: this.currencyselect,
      Date: this.datepicker,
      PaidBy: this.paidby,
      UserList: JSON.stringify(this.checkeduser),
      SpiltList: JSON.stringify(this.textboxValues),
      Notes: this.notes,
      SplitBy: this.SpiltBy
    }
    this.groupservice.createExpense(this.expensesdata).subscribe(data => {
      this.router.navigate(['/group',this.groupId]);

    })
  }
  onClosed() {
    this.amountAlert = !this.amountAlert
  }
  editExpenseByexpid(Groudid: string, expid: string) {
    this.getExpenseByexpid = {
      groupId: Groudid,
      expId: expid
    }
    this.groupservice.editExpenseByexpid(this.getExpenseByexpid).subscribe(response => {
      console.log(response);
      this.expensesname = response.name;
      this.amount = response.amount;
      this.GetParticipate = response.expenseDetailsresponses;
      this.datepicker = new Date(response.date);
      this.currencyselect = response.currency;
      this.paidby = this.GetParticipate[0].paidby;
      this.SpiltBy = this.GetParticipate[0].splitBy;
      this.notes = response.notes;
   
    }
    )
  }
  ispartEn(id: string, users: any) {
    if (id != null || id != undefined) {
      if (this.GetParticipate.length != 0) {
        let user = this.GetParticipate.find(a => a.participantId == id);

        if (user != null) {
         const checkuser = this.checkeduser.find(a => a.userId == id)
          if(checkuser==null){
            this.checkeduser.push(users);
            this.textboxValues.push(user.participantAmount);
          }

          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
  issplitEnb(ex: string) {
    if (this.SpiltBy == ex) {
      return true
    }
    return false;
  }
  openModals(template: TemplateRef<void>) {
this.modalRef = this.modalService.show(template);
  }
}

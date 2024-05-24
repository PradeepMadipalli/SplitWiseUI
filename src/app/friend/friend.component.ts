import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { InvitationRequest } from '../models/members.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss'
})
export class FriendComponent implements OnInit {

  Fname: string;
  Femail: string;
  invitationrequest: InvitationRequest;
  constructor(public groupserive: GroupService) {

  }
  ngOnInit(): void {

  }
  CreateInvitation() {
    this.invitationrequest = {
      Name: this.Fname,
      Email: this.Femail
    }
    this.groupserive.Sendinvitation(this.invitationrequest).subscribe(data => {

    });
  }
  getInvitation(){
    3.
    
  }
}

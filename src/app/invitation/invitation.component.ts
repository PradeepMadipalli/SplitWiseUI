import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvitationRequest } from '../models/members.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent implements OnInit {
  name:string;
  email:string;
  password:string;
friendinvitation:InvitationRequest
  constructor(private groupservice:GroupService) {

  }
  ngOnInit(): void {
    
  }
   onSubmit() {
      this.friendinvitation={
        Name:this.name,
        Email:this.email
      }
      this.groupservice.Sendinvitation(this.friendinvitation).subscribe(response=>{
         
      });
  }
}

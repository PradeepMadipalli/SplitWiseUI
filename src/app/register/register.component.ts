import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strongPassword } from '../shared/validpassword.validator';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../models/register.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GetInvitationRequest } from '../models/members.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  InvitationId: string;
  myForm: FormGroup;
  responseData: any;
  registrationModel: Register;
  getinvitionRequest: GetInvitationRequest;
  constructor(private authservice: AuthService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService, public route: ActivatedRoute,
     public groupservic: GroupService,private router:Router) {

    this.getInvitation("f08b26ad-9f51-4c8a-7852-08dc79b01847");
  }
  ngOnInit(): void {
    this.InvitationId=null;
    this.myForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), strongPassword()]]
    });
    this.InvitationId = this.route.snapshot.params['id'];

    this.getInvitation(this.InvitationId);
    console.log(this.InvitationId);
  }

  onSubmit() {
    this.registrationModel = {
      UserName: this.myForm.value.name,
      Email: this.myForm.value.email,
      Password: this.myForm.value.password
    }

    this.authservice.register(this.registrationModel).subscribe(
      data => {
        console.log(data);
        this.responseData = data;
        this.toastr.success("registration Success");
        sessionStorage.setItem("UserName", this.responseData.userName);
        this.router.navigate(['/groups']);
      },
      error => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
  getInvitation(id: any) {
    this.getinvitionRequest = {
      InvitationId: id,
      Name: null
    }
    console.log(this.getinvitionRequest);
    this.groupservic.GetInvitation(this.getinvitionRequest).subscribe(data => {
      this.myForm.setValue({
        name: data.name,
        email: data.email,
        password:'',
      })
    });

  }
}

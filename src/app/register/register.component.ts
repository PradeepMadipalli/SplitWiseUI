import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strongPassword } from '../shared/validpassword.validator';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  myForm:FormGroup;
  responseData: any;
  registrationModel:Register;
  constructor(private authservice:AuthService,
    private formbuilder:FormBuilder,
  private toastr:ToastrService) {
  
    
  }
  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), strongPassword()]]
    });
  }
  onSubmit() {
  this.registrationModel={
    UserName:this.myForm.value.name,
    Email:this.myForm.value.email,
    Password:this.myForm.value.password
  }

     this.authservice.register(this.registrationModel).subscribe(
      data => {
        this.responseData = data;
        this.toastr.success("registration Success");
      },
      error => {
        this.toastr.error('Error fetching data:', error);
      }
    );
  }
}

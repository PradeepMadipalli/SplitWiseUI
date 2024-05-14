import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { strongPassword } from '../shared/validpassword.validator';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string;
  password: string;
  loginFrom: FormGroup;
  responseData: any;
  loginModel:Login;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService,
    private config:ConfigService,private toastr:ToastrService) { }
  ngOnInit() {
    this.loginFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), strongPassword()]]
    });
  }
  onSubmit() {
  this.loginModel={
    Email:this.loginFrom.value.email,
    Password:this.loginFrom.value.password
  }
    this.authService.login(this.loginModel).subscribe(
      data => {
        const token = this.config.getToken();
    
        this.responseData = data;
        sessionStorage.setItem("Profile", this.responseData.profiles);
        sessionStorage.setItem("Token", this.responseData.token);
        sessionStorage.setItem("userid", this.responseData.profiles.uId)
        sessionStorage.setItem("userid", this.responseData.profiles.uId)
        this.router.navigate(['/dashboard']);


      },
      error => {
        this.toastr.error('Error fetching data:', error);
      }
    );

  }
}

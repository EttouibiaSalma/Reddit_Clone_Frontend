import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean;
  registerSuccessMsg: string;

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService, private activatedRoute:ActivatedRoute) {
    this.loginRequestPayload = {
      username: '',
      password:''
    }
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['registered'] !== undefined && params['registered'] === 'true') {
        this.toastr.success('You have registered successfully');
        this.registerSuccessMsg = 'Follow activation link sent in your inbox to activate your account'
      }
    })
  }
  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequestPayload)
      .subscribe(data => {
        if (data) {
          this.isError = false;
          this.router.navigateByUrl("/");
          this.toastr.success('Login successful');
        } else {
          this.isError = true;
        }
      
    })
    //   .subscribe(data => {
    //   console.log(data);
    // })
  }

}

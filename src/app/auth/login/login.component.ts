import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { md5 } from 'js-md5';

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  opType = 1; // 0: register, 1: login, 2: reset password
  formData: any={};

  // move to service??
  CAPTCHA = './api/users/captcha'
  SEND_EMAIL_CODE = './api/users/sendEmailCode'
  LOGIN = './api/users/login'
  REGISTER = './api/users/register'
  RESET_PASSWORD='./api/users/resetPassword'

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  // hardcoded login
  login() {
    this.authService.login(2); // Set user ID to 2
    this.router.navigate(['/products']); // Redirect after login
  }


  ngOnInit() : void{
    this.showPanel(1);
  }

  showPanel(type: number) {
    this.opType = type;
    this.resetForm();
  }

  changeCaptcha(type: number) {
    this.CAPTCHA = `/api/captcha?type=${type}&time=${new Date().getTime()}`;
  }

  getEmailCode(){
    if(!this.formData.email) {
      alert('Please enter your email first');
      return;
    }

    this.http.post(this.SEND_EMAIL_CODE, {email: this.formData.email}).subscribe (
      response => {
        alert('Verification code sent to your email.');
      }, 
      error => {
        console.error('Error sending Email Code: ', error);
        alert('Failed to send verification code.');
      }
    );
  }

  // use cookie 
  onSubmit(){
    if(this.opType === 1) {
      // login
      this.http.post(this.LOGIN, {
        email: this.formData.email,
        password: md5(this.formData.password),
        captcha: this.formData.captcha
      }).subscribe(
        response => {
          alert('Login successful');
          this.router.navigate(['/product']);
        },
        error => {
          console.error('Login error:', error);
          alert('Login failed.');
        }
      );
    } else if(this.opType === 0) {
      // register
      if(this.formData.createPassword != this.formData.repeatPassword) {
        alert('Passwords do not match');
        return;
      }
      this.http.post(this.REGISTER, {
        email: this.formData.email,
        emailCode: this.formData.emailCode,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        password: md5(this.formData.createPassword),
        captcha: this.formData.captcha
      }).subscribe(
        response => {
          alert('Registration successful, please login');
          this.showPanel(1); // Redirect to login panel
        },
        error => {
          console.error('Registration error:', error);
          alert('Registration failed.');
        }
      );
    } else if (this.opType === 2) {
      //  reset password 
      this.http.post(this.RESET_PASSWORD, {
        email: this.formData.email,
        emailCode: this.formData.emailCode,
        captcha: this.formData.captcha
      }).subscribe(
        response => {
          alert('Password reset successful, please login');
          this.showPanel(1);
        },
        error => {
          console.error('Password reset error: ', error);
          alert('Password reset failed');
        }
      );
    }
  }

  resetForm(){
    this.changeCaptcha(0);
    this.formData ={};
  }

}

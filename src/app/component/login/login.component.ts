import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../../model/Auth';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordFieldType: string = 'password';
  showFailedResponse: boolean = false;
  message: string = '';


  constructor(private userService: UserService, private userAuthService: UserAuthService, private router: Router) {
  }



  form: LoginForm = {
    email: '',
    password: ''
  }



  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe((response: any) => {
      this.userAuthService.setRole(response.data.userRole);
      this.userAuthService.setToken(response.data.jwt);

      const role = response.data.userRole;
      if(role === 'ADMIN'){
        this.router.navigate(['/admin'])
      }else{
        this.router.navigate(['/user'])
      }

    },
    (error =>{
      if (error.status === 0) {
        this.showFailedAlert('Server is currently unavailable. Please try again later...');
      } else {
        this.showFailedAlert(error.error.message);
      }
    })
    );
  }


  ngOnInit(): void {
  }


  showFailedAlert(responseMessage: string): void {
    this.showFailedResponse = true;
    this.message = responseMessage;
    setTimeout(() => {
      this.showFailedResponse = false;
    }, 5000);
  }



  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }



}

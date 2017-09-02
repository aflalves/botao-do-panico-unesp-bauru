import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  email: string;
  password: string;

  constructor(public authService: AuthService, private router:Router) {}


  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password).then((data) => {
      this.router.navigate(['']);
    })
    this.email = this.password = '';    
  }

}

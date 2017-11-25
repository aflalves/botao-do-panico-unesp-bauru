import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  url: string;

  constructor(public authService: AuthService, private router:Router) {
   }

  ngOnInit() {
    this.url = this.router.url;
  }

  logout() {
    this.authService.logout().then((data) => {
      this.router.navigate(['login']);
    });
  }

  relatorios() {
    this.router.navigate(['relatorios']);
  }

  home() {
    this.router.navigate(['/']);
  }

}

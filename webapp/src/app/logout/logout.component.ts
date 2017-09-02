import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().then((data) => {
      this.router.navigate(['login']);
    });
  }

}

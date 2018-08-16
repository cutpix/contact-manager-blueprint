import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { JwtSecurityToken } from '../models/jwt-security-token';

@Component({
  selector: 'cm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/contacts']);
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = `grant_type=password&username=${values.username}&password=${values.password}`;

    this.api.post<JwtSecurityToken>('oauth2/token', payload)
      .subscribe(data => {
        this.auth.setToken(data.access_token);
        this.router.navigate(['/contacts']);
      });
  }

}

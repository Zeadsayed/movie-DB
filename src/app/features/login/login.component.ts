import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  err: string = '';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
  ) {}

  OnLogin(formData: FormGroup) {
    this.err = '';
    this._AuthService.login(formData.value).subscribe({
      next: (res) => {
        if (res?.accessToken) {
          this._AuthService.saveSession(res);
          this._Router.navigate(['home']);
        } else {
          this.err = 'Invalid credentials';
        }
      },
      error: (err) => {
        this.err = err.error?.message || 'Invalid username or password';
      },
    });
  }
}

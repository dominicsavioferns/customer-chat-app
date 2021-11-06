import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from '../interfaces/credentials.interface';

@Component({
  selector: 'ott-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  public onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) return;
    this.authService
      .login(this.loginForm.value as Credentials)
      .subscribe((isAuthenticated) =>
        isAuthenticated ? this.router.navigate(['/chat']) : null
      );
  }
}

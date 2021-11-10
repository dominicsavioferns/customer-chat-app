import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
	public invalidCredentialsError: string | null;

	constructor(
		private authService: AuthenticationService,
		private router: Router,
		private title: Title
	) {
		this.invalidCredentialsError = null;
		this.title.setTitle('Ottonova Bot | Login');
		this.loginForm = new FormGroup({
			username: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required]),
		});
	}

	ngOnInit(): void { }

	/**
	 * @description method to handle user login
	 * redirects to chat page on success
	 * @returns
	 */
	public onSubmit(): void {
		if (this.loginForm.invalid) return;
		this.authService
			.login(this.loginForm.value as Credentials)
			.subscribe((isAuthenticated) => {
				if (isAuthenticated) {
					this.router.navigate(['/chat']);
					this.invalidCredentialsError = null;
				}
				else {
					this.invalidCredentialsError = 'Invalid Credentials';
				}
			});
	}
}

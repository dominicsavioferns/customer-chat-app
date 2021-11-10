import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthenticationService } from '../authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
	let routerSpy: jasmine.SpyObj<Router>;

	beforeEach(async () => {
		authServiceSpy = jasmine.createSpyObj<AuthenticationService>('AuthenticationService', ['login']);
		routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

		await TestBed.configureTestingModule({
			declarations: [LoginComponent],
			imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
			providers: [
				{
					provide: AuthenticationService,
					useValue: authServiceSpy
				},
				{
					provide: Router,
					useValue: routerSpy
				},
				{
					provide: Title,
					useClass: Title
				}
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set title to Ottonova Bot | Login', () => {
		let title = TestBed.inject(Title);
		expect(title.getTitle()).toEqual('Ottonova Bot | Login');
	});

	describe('Test form validity', () => {

		it('should be invalid by default', () => {
			expect(component.loginForm.invalid).toBeTrue();
		});

		it('should be invalid when username is empty', () => {
			component.loginForm.patchValue({ password: 'password' });
			expect(component.loginForm.invalid).toBeTrue();
		});

		it('should be invalid when password is empty', () => {
			component.loginForm.patchValue({ username: 'dominic' })
			expect(component.loginForm.invalid).toBeTrue();
		});

		it('should be valid when when username and password is provided', () => {
			component.loginForm.patchValue({ username: 'dominic' });
			component.loginForm.patchValue({ password: 'password' });
			expect(component.loginForm.invalid).toBeFalse();
		});
	});

	describe('OnSubmit event', () => {
		let loginBtn: DebugElement;

		beforeEach(() => {
			loginBtn = fixture.debugElement.query(By.css('#login-btn'));
			component.loginForm.patchValue({ username: 'dominic' });
			component.loginForm.patchValue({ password: 'password' });
		});

		it('should call onSubmit method when login button is clicked', () => {
			spyOn(fixture.componentInstance, 'onSubmit');
			loginBtn.nativeElement.click();
			fixture.detectChanges();

			expect(fixture.componentInstance.onSubmit).toHaveBeenCalled();
		});

		it('should call login method in the authentication service', () => {
			authServiceSpy.login.and.returnValue(of(true));
			loginBtn.nativeElement.click();

			expect(authServiceSpy.login).toHaveBeenCalled();
		});

		it('should redirect user to chat page', () => {
			authServiceSpy.login.and.returnValue(of(true));
			loginBtn.nativeElement.click();

			expect(routerSpy.navigate).toHaveBeenCalledWith(['/chat']);
		});

		describe('Wrong credentials', () => {
			let loginBtn;

			beforeEach(() => {
				authServiceSpy.login.and.returnValue(of(false));
				loginBtn = fixture.debugElement.query(By.css('#login-btn'));
				component.loginForm.patchValue({ username: 'dominic' });
				component.loginForm.patchValue({ password: 'password' });
				loginBtn.nativeElement.click();
				fixture.detectChanges();
			});

			it('should set error message when credentials are wrong', () => {
				expect(component.invalidCredentialsError).toEqual('Invalid Credentials');
			});
		});
	});
});

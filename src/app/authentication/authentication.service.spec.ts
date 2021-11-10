import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { Credentials } from './interfaces/credentials.interface';

describe('AuthenticationService', () => {
	let service: AuthenticationService;
	let validCredentialStub: Credentials = { username: 'dominic', password: 'savio' };

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthenticationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('Login', () => {

		it("should return false on invalid credentials", () => {
			service.login({ username: 'wronguser', password: 'wrongpass' })
				.subscribe(value => {
					expect(value).toBeFalse();
				});
		});

		it("should return true on valid credentials", () => {
			service.login(validCredentialStub)
				.subscribe(value => {
					expect(value).toBeTrue();
				});
		});

		it('should set username on valid login', () => {
			service.login(validCredentialStub)
				.subscribe(_ => {
					expect(service.username).toEqual(validCredentialStub.username);
				});
		});
	});

	describe('Logout', () => {
		it('should unset username on logout', () => {
			service.logout()
				.subscribe(_ => {
					expect(service.username).toBeNull();
				});
		});
	});

});

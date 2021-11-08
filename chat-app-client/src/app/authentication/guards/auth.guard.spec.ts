import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
	let guard: AuthGuard;
	let routerSpy: jasmine.SpyObj<Router>;
	let routeSpy: jasmine.SpyObj<ActivatedRouteSnapshot>;
	let stateSpy: jasmine.SpyObj<RouterStateSnapshot>;
	let authServiceStub: Partial<AuthenticationService>;

	beforeEach(() => {
		routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
		routeSpy = jasmine.createSpyObj<ActivatedRouteSnapshot>('ActivatedRouteSnapshot', ['url']);
		stateSpy = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['url']);
		authServiceStub = {};
		guard = new AuthGuard(authServiceStub as AuthenticationService, routerSpy)
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should return true when user is signed in', () => {
		authServiceStub.username = "dominic";
		expect(guard.canActivate(routeSpy, stateSpy)).toBeTrue();
	});

	it('should return false when user is not signed in', () => {
		expect(guard.canActivate(routeSpy, stateSpy)).toBeFalse();
	});
});

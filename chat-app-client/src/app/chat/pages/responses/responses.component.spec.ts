import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { MaterialModule } from 'src/app/material/material.module';
import { ChatService } from '../../chat.service';

import { ResponsesComponent } from './responses.component';

describe('ResponsesComponent', () => {
	let component: ResponsesComponent;
	let fixture: ComponentFixture<ResponsesComponent>;
	let chatServiceSpy: jasmine.SpyObj<ChatService>;
	let routerServiceSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
	let authServiceSpy = jasmine.createSpyObj<AuthenticationService>('AuthenticationService', ['logout']);

	beforeEach(async () => {
		chatServiceSpy = jasmine.createSpyObj<ChatService>('ChatService', ['setResponse', 'getResponse', 'getAllResponses', 'resetChatResponses']);
		routerServiceSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

		await TestBed.configureTestingModule({
			declarations: [ResponsesComponent],
			providers: [
				{
					provide: ChatService,
					useValue: chatServiceSpy
				},
				{
					provide: AuthenticationService,
					useValue: authServiceSpy
				},
				{
					provide: Router,
					useValue: routerServiceSpy
				},
			],
			imports: [
				MaterialModule
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ResponsesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('hasResponses', () => {
		it('should not have any chat responses by default', () => {
			expect(component.hasResponses()).toBeFalse();
		});
	});


	describe('handleLogout', () => {
		beforeEach(() => {
			authServiceSpy.logout.and.returnValue(of(true));
			component.handleLogout();
		});

		it('should reset chat responses', () => {
			expect(chatServiceSpy.resetChatResponses).toHaveBeenCalled();
		});

		it('should redirect user to login page after logout', () => {
			expect(routerServiceSpy.navigate).toHaveBeenCalledWith(['/login']);
		});
	});

	describe('getResponse', () => {
		it('should have get data of a command', () => {
			component.chatResponses = {} as any;
			component.chatResponses.map = 'data';
			fixture.detectChanges();
			expect(component.getResponse('map')).toEqual('data');
		});
	});

	describe('getMapCoordsToText', () => {
		it('should convert stringyfied coords to text', () => {
			expect(component.getMapCoordsToText(JSON.stringify({ lat: 100, lng: 100 }))).toEqual('Latitude: 100 Longitude: 100');
		});
	});
});

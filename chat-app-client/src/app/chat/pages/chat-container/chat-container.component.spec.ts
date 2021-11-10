import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { MaterialModule } from 'src/app/material/material.module';
import { ChatService } from '../../chat.service';

import { ChatContainerComponent } from './chat-container.component';

describe('ChatContainerComponent', () => {
	let component: ChatContainerComponent;
	let fixture: ComponentFixture<ChatContainerComponent>;
	let chatServiceSpy: jasmine.SpyObj<ChatService>;
	let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
	let routerServiceSpy: jasmine.SpyObj<Router>;

	beforeEach(async () => {
		chatServiceSpy = jasmine.createSpyObj<ChatService>('ChatService', ['sendMessage', 'triggerCommand']);
		authServiceSpy = jasmine.createSpyObj<AuthenticationService>('AuthenticationService', ['logout']);
		routerServiceSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
		chatServiceSpy.command$ = new Subject();
		chatServiceSpy.message$ = new Subject();

		await TestBed.configureTestingModule({
			declarations: [
				ChatContainerComponent
			],
			schemas: [NO_ERRORS_SCHEMA],
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
				{
					provide: Title,
					useClass: Title
				},
			],
			imports: [MaterialModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set title to Ottonova Bot | Chat', () => {
		let title = TestBed.inject(Title);
		expect(title.getTitle()).toEqual('Ottonova Bot | Chat');
	});

	describe('sendMessage', () => {
		let author = 'dominic';
		let message = 'my message';

		beforeEach(() => {
			authServiceSpy.username = author;
			component.sendMessage(message);
		})

		it('should call sendMessage in chat service', () => {
			expect(chatServiceSpy.sendMessage).toHaveBeenCalledWith({ author, message });
		});
	});

	describe('triggerCommand', () => {
		let author = 'dominic';
		let message = '';

		beforeEach(() => {
			authServiceSpy.username = author;
			component.triggerCommand();
		})

		it('should call triggerCommand in chat service', () => {
			expect(chatServiceSpy.triggerCommand).toHaveBeenCalledWith({ author, message });
		});
	});

	describe('getCurrentUsername', () => {
		let author = 'dominic';

		beforeEach(() => {
			authServiceSpy.username = author;
		})

		it('should return username', () => {
			expect(component.getCurrentUsername()).toEqual(author);
		});
	});

	describe('logout', () => {

		beforeEach(() => {
			authServiceSpy.logout.and.returnValue(of(true));
			component.logout();
		})

		it('should call logout method in authentication service', () => {
			expect(authServiceSpy.logout).toHaveBeenCalled();
		});

		it('should redirect user to login page', () => {
			expect(routerServiceSpy.navigate).toHaveBeenCalledWith(['/login'])
		});
	});
});

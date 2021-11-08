import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { MaterialModule } from 'src/app/material/material.module';
import { ChatService } from '../../chat.service';

import { MessagesContainerComponent } from './messages-container.component';

describe('MessagesContainerComponent', () => {
	let component: MessagesContainerComponent;
	let fixture: ComponentFixture<MessagesContainerComponent>;
	let chatServiceSpy: jasmine.SpyObj<ChatService>;
	let authServiceSpy: Partial<AuthenticationService>;
	let routerServiceSpy: jasmine.SpyObj<Router>;
	let chatSection: DebugElement;

	beforeEach(async () => {
		chatServiceSpy = jasmine.createSpyObj<ChatService>('ChatService', ['sendMessage']);
		authServiceSpy = { username: 'dominic' };
		routerServiceSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

		chatServiceSpy.message$ = new Subject();
		chatServiceSpy.command$ = new Subject();

		await TestBed.configureTestingModule({
			declarations: [MessagesContainerComponent],
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
				}
			],
			imports: [MaterialModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MessagesContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		chatSection = fixture.debugElement.query(By.css('.messages'));
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should subscribe to message events from socket', () => {
		expect(chatServiceSpy.message$.observed).toBeTrue();
	});

	it('should subscribe to command events from socket', () => {
		expect(chatServiceSpy.command$.observed).toBeTrue();
	});

	describe('New message event', () => {
		/**
		 * If the height of the chat section is greater that what it was
		 * before pushing a new message implies that a new message component
		 * was added into the chats section
		 */
		it('should add new message component to chats list', () => {
			let initialChatSectionHeight = chatSection.nativeElement.scrollHeight;
			chatServiceSpy.message$.next({ author: 'dominic', timestamp: new Date(), message: 'Hello' });
			let newChatSectionHeight = chatSection.nativeElement.scrollHeight;

			expect(newChatSectionHeight).toBeGreaterThan(initialChatSectionHeight);
		});
	});

	describe('New command event', () => {
		/**
		 * If the height of the chat section is greater that what it was
		 * before pushing a new command implies that a new widget
		 * was added into the chats section
		 */

		it('should add new map widget component to chats list and send message', () => {
			let initialChatSectionHeight = chatSection.nativeElement.scrollHeight;
			chatServiceSpy.command$.next({
				author: 'dominic',
				command: {
					data: {
						lat: 100,
						lng: 100
					},
					type: "map"
				}
			});
			let newChatSectionHeight = chatSection.nativeElement.scrollHeight;

			expect(newChatSectionHeight).toBeGreaterThan(initialChatSectionHeight);
		});

		it('should add new date widget component to chats list', () => {
			let initialChatSectionHeight = chatSection.nativeElement.scrollHeight;
			chatServiceSpy.command$.next({
				author: 'dominic',
				command: {
					data: new Date().toISOString(),
					type: "date"
				}
			});
			let newChatSectionHeight = chatSection.nativeElement.scrollHeight;

			expect(newChatSectionHeight).toBeGreaterThan(initialChatSectionHeight);
		});

		it('should add new complete widget component to chats list', () => {
			let initialChatSectionHeight = chatSection.nativeElement.scrollHeight;
			chatServiceSpy.command$.next({
				author: 'dominic',
				command: {
					data: ['Yes', 'No'],
					type: "complete"
				}
			});
			let newChatSectionHeight = chatSection.nativeElement.scrollHeight;

			expect(newChatSectionHeight).toBeGreaterThan(initialChatSectionHeight);
		});

		it('should add new rate widget component to chats list', () => {
			let initialChatSectionHeight = chatSection.nativeElement.scrollHeight;
			chatServiceSpy.command$.next({
				author: 'dominic',
				command: {
					data: [0, 5],
					type: "rate"
				}
			});
			let newChatSectionHeight = chatSection.nativeElement.scrollHeight;

			expect(newChatSectionHeight).toBeGreaterThan(initialChatSectionHeight);
		});
	});

});

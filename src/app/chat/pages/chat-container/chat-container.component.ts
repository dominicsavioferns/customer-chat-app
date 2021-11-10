import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ChatService } from '../../chat.service';
import { Payload } from '../../interfaces/payload.interface';

@Component({
	selector: 'ott-chat-container',
	templateUrl: './chat-container.component.html',
	styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
	constructor(
		private chatService: ChatService,
		private authService: AuthenticationService,
		private router: Router,
		private title: Title
	) {
		this.title.setTitle('Ottonova Bot | Chat');
	}

	ngOnInit(): void { }

	/**
	 * @description method invokes chat service to send message via socket
	 * emits a change in the subject to add users message to the chat section
	 * the method is invoke in response the to send message event from the chat panel
	 * @param $event - message from event in chat panel
	 */
	public sendMessage($event: string): void {
		const payload: Payload = {
			author: this.authService.username,
			message: $event,
		};

		this.chatService.message$.next({ ...payload, timestamp: new Date() });
		this.chatService.sendMessage(payload);
	}

	/**
	 * @description method to trigger a command from the server
	 * invokes triggerCommand method in the chat service
	 */
	public triggerCommand(): void {
		const payload: Payload = { author: this.authService.username, message: '' };
		this.chatService.triggerCommand(payload);
	}

	/**
	 * @description method to get the username of current user
	 * @returns {string}
	 */
	public getCurrentUsername(): string | null {
		return this.authService.username;
	}

	/**
	 * @description method to logout current user
	 * redirects to login page on success
	 */
	public logout(): void {
		this.authService.logout().subscribe((_) => {
			this.chatService.resetChatResponses();
			this.router.navigate(['/login']);
		});
	}

	/**
	 * @description method to close chat
	 * redirects to chat responses
	 */
	public closeChat(): void {
		this.router.navigate(['/chat/responses']);
	}
}

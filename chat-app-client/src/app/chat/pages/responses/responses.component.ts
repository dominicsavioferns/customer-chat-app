import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ChatService } from '../../chat.service';

@Component({
	selector: 'ott-responses',
	templateUrl: './responses.component.html',
	styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent {

	public chatResponses: any;
	public commands: string[];

	constructor(
		private chatService: ChatService,
		private authService: AuthenticationService,
		private router: Router
	) {
		this.chatResponses = this.chatService.getAllResponses() | {} as any;
		this.commands = !this.chatResponses ? Object.keys(this.chatResponses) : [];
	}

	hasResponses(): boolean {
		return Object.keys(this.chatResponses).length > 0;
	}

	handleLogout(): void {
		this.authService.logout()
			.subscribe(_ => {
				this.chatService.resetChatResponses();
				this.router.navigate(['/login']);
			});
	}

	getResponse(command: string): string {
		return this.chatResponses[command];
	}

	getMapCoordsToText(coords: string): string {
		const coordsData = JSON.parse(coords);
		return `Latitude: ${coordsData.lat} Longitude: ${coordsData.lng}`;
	}
}

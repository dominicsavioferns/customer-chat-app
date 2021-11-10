import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ChatMessage } from './interfaces/chat.interface';
import { CommandResponse } from './interfaces/command.interface';
import { Payload } from './interfaces/payload.interface';

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	/**
	 * Subject for new message events
	 */
	public message$: Subject<ChatMessage>;

	/**
	 * Subject for new command events
	 */
	public command$: Subject<CommandResponse>;

	/**
	 * instance of socket connection
	 */
	public socket: Socket;

	/**
	 * store widget responses of the user
	 */
	private responses: any;

	constructor() {

		this.command$ = new Subject();
		this.message$ = new Subject();
		this.responses = {};
		this.socket = io(environment.serverUrl);

		/**
		 * listen for messaeg events
		 */
		this.socket.on('message', (message) => {
			this.message$.next(message);
		});

		/**
		 * listen for command events
		 */
		this.socket.on('command', (command) => {
			this.command$.next(command);
		});
	}

	/**
	 * @description sends message to server via socket
	 * @param {Payload} payload
	 */
	public sendMessage(payload: Payload): Socket {
		return this.socket.emit('message', payload);
	}

	/**
	 * @description sends event to socket to trigger a command
	 * @param {Payload} payload
	 */
	public triggerCommand(payload: Payload): Socket {
		return this.socket.emit('command', payload);
	}

	public setResponse(key: string, value: any): void {
		this.responses[key] = value;
	}

	public getResponse(key: string): any {
		return this.responses[key];
	}

	public getAllResponses(): any {
		return this.responses;
	}

	public resetChatResponses(): void {
		this.responses = {};
	}
}

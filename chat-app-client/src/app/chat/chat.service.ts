import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  public message$: Subject<ChatMessage> = new Subject();

  /**
   * Subject for new command events
   */
  public command$: Subject<CommandResponse> = new Subject();

  /**
   * instance of socket connection
   */
  private socket: Socket;

  constructor() {
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
  public sendMessage(payload: Payload): void {
    this.socket.emit('message', payload);
  }

  /**
   * @description sends event to socket to trigger a command
   * @param {Payload} payload
   */
  public triggerCommand(payload: Payload): void {
    this.socket.emit('command', payload);
  }
}

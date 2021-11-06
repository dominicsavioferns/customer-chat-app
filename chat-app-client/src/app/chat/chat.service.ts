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
  public message$: Subject<ChatMessage> = new Subject();
  public command$: Subject<CommandResponse> = new Subject();
  private socket: Socket;
  constructor() {
    this.socket = io(environment.serverUrl);
  }

  public sendMessage(payload: Payload) {
    this.socket.emit('message', payload);
  }

  public receiveNewMessage(): Observable<ChatMessage> {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  }

  public triggerCommand(payload: Payload) {
    this.socket.emit('command', payload);
  }

  public receiveCommand(): Observable<CommandResponse> {
    this.socket.on('command', (command) => {
      this.command$.next(command);
    });

    return this.command$.asObservable();
  }
}

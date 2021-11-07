import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../interfaces/chat.interface';
import { Payload } from '../interfaces/payload.interface';

@Component({
  selector: 'ott-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public sendMessage($event: string): void {
    const payload: Payload = {
      author: this.authService.username,
      message: $event,
    };

    this.chatService.message$.next({ ...payload, timestamp: new Date() });
    this.chatService.sendMessage(payload);
  }

  public triggerCommand() {
    const payload: Payload = { author: this.authService.username, message: '' };
    this.chatService.triggerCommand(payload);
  }

  public getCurrentUsername(): string {
    return this.authService.username;
  }
  public logout(): void {
    this.authService.logout().subscribe((_) => {
      this.router.navigate(['/login']);
    });
  }
}

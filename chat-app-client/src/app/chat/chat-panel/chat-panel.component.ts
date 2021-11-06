import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ott-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent implements OnInit {
  @Output() onMessage: EventEmitter<string>;
  @Output() onCommand: EventEmitter<boolean>;
  public chatMessage: FormControl;

  constructor() {
    this.onMessage = new EventEmitter<string>();
    this.onCommand = new EventEmitter<boolean>();
    this.chatMessage = new FormControl('');
  }

  ngOnInit(): void {}

  public handleSendMessage() {
    const message = this.chatMessage.value;

    if (!message) return;

    this.onMessage.emit(message);
    this.chatMessage.reset();
  }

  public handleSendCommand() {
    this.onCommand.emit(true);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ott-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent implements OnInit {
  /**
   * event to emit a message
   */
  @Output() onMessage: EventEmitter<string>;

  /**
   * event to trigger command from server
   */
  @Output() onCommand: EventEmitter<boolean>;

  /**
   * form control for user input
   * message stored in this object
   */
  public chatMessage: FormControl;

  constructor() {
    this.onMessage = new EventEmitter<string>();
    this.onCommand = new EventEmitter<boolean>();
    this.chatMessage = new FormControl('');
  }

  ngOnInit(): void {}

  /**
   * @describe handles event when user clicks on send message
   * emits an event to send message in parent component
   */
  public handleSendMessage(): void {
    const message = this.chatMessage.value;

    if (!message) return;

    this.onMessage.emit(message);
    this.chatMessage.reset();
  }

  /**
   * @description handles event when user clicks trigger command
   * emits an event to parent component to trigger a command from server
   */
  public handleSendCommand(): void {
    this.onCommand.emit(true);
  }
}

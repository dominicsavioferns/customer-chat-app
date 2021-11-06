import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../interfaces/chat.interface';
import * as moment from 'moment';

@Component({
  selector: 'ott-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() username!: string;
  @Input() chat!: ChatMessage;

  constructor() {}

  ngOnInit(): void {}

  public toMomentTime(timestamp: Date): string {
    return moment(timestamp).fromNow();
  }
}

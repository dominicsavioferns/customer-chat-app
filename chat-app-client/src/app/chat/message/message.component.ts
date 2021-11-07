import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../interfaces/chat.interface';
import * as moment from 'moment';
import { transition, trigger, useAnimation } from '@angular/animations';
import { entryAnimation } from '../entry.animation';

@Component({
  selector: 'ott-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(entryAnimation, {
          params: {
            opacity: '0%',
            time: '600ms',
          },
        }),
      ]),
    ]),
  ],
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

import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../../interfaces/chat.interface';
import * as moment from 'moment';
import { transition, trigger, useAnimation } from '@angular/animations';
import { entryAnimation } from '../../animations/entry.animation';

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
  @Input() username!: string | null;
  @Input() chat!: ChatMessage;

  constructor() {}

  ngOnInit(): void {}

  /**
   * @description converts time to relative time
   * @param {Date} timestamp
   * @returns {string} - relative time
   */
  public toMomentTime(timestamp: Date): string {
    return moment(timestamp).fromNow();
  }
}

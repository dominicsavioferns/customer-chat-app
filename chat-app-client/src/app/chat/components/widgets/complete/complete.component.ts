import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { entryAnimation } from '../../../animations/entry.animation';

@Component({
  selector: 'ott-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
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
export class CompleteComponent implements OnInit {
  @Input() author!: string;
  @Input() actions!: string[];
  @Input() action!: string;

  /**
   * event when user selctes an action
   */
  @Output() onAction: EventEmitter<string>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.onAction = new EventEmitter<string>();
  }

  ngOnInit(): void {}

  /**
   * @description method handles action selected by user
   * @param {string} actionType
   */
  public handleAction(actionType: string): void {
    if (!this.action) {
      this.onAction.emit(actionType);
      this.action = actionType;
    }
  }
}

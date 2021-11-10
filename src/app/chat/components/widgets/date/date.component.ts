import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';

import * as moment from 'moment';

import { entryAnimation } from '../../../animations/entry.animation';

@Component({
  selector: 'ott-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
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
export class DateComponent implements OnInit {
  @Input() minDate!: Date;
  @Input() author!: string;
  @Input() user!: string | null;
  @Input() selectedDay!: string;
  @Output() onDaySelected: EventEmitter<string>;

  // list of days
  public days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  constructor() {
    this.onDaySelected = new EventEmitter<string>();
  }

  ngOnInit(): void {
    /**
     * sort days by date sent by server
     */
    this.sortDaysByMinDate();
  }

  /**
   * @description handles event when user selects day
   * @param {string} $event - day selected by user
   */
  public handleDaySelected($event: string): void {
    this.onDaySelected.emit($event);
    this.selectedDay = $event;
  }

  /**
   * @description put the the date sent by server first in the list
   */
  private sortDaysByMinDate(): void {
    const day = moment(this.minDate).format('dddd');
    let slice1 = this.days.slice(this.days.indexOf(day));
    this.days = [...slice1, ...this.days.filter((d) => !slice1.includes(d))];
  }
}

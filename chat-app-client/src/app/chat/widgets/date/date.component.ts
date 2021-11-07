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
import { entryAnimation } from '../../entry.animation';

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
  @Input() user!: string;
  @Input() selectedDay!: string;
  @Output() onDaySelected: EventEmitter<string>;

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
    this.sortDaysByMinDate();
  }

  public handleDaySelected($event: string): void {
    this.onDaySelected.emit($event);
    this.selectedDay = $event;
  }

  private sortDaysByMinDate() {
    const day = moment(this.minDate).format('dddd');
    let slice1 = this.days.slice(this.days.indexOf(day));
    this.days = [...slice1, ...this.days.filter((d) => !slice1.includes(d))];
    console.log(this.days);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ott-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input() minDate!: Date;
  @Output() onDateSelected: EventEmitter<string>;

  selected!: Date | null;

  constructor() {
    this.onDateSelected = new EventEmitter<string>();
  }

  ngOnInit(): void {}

  handleDateSelected($event: string): void {
    this.onDateSelected.emit($event);
    this.selected = new Date($event);
  }
}

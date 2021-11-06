import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ott-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
})
export class CompleteComponent implements OnInit {
  @Input() author!: string;
  @Input() actions!: string[];
  @Output() onAction: EventEmitter<string>;

  constructor() {
    this.onAction = new EventEmitter<string>();
  }

  ngOnInit(): void {}

  public handleAction(action: string) {
    this.onAction.emit(action);
  }
}

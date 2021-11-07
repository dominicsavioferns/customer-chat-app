import { transition, trigger, useAnimation } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { entryAnimation } from '../../entry.animation';

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
  @Output() onAction: EventEmitter<string>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.onAction = new EventEmitter<string>();
  }

  ngOnInit(): void {}

  public handleAction(actionType: string) {
    if (!this.action) {
      this.onAction.emit(actionType);
      this.action = actionType;
    }
  }
}

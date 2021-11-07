import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { entryAnimation } from '../../entry.animation';

@Component({
  selector: 'ott-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
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
export class RateComponent implements OnInit {
  @Input() author!: string;
  @Input() user!: string;
  @Input() selectedRating!: number;
  @Output() onRating!: EventEmitter<number>;

  public stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star',
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star',
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star',
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star',
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star',
    },
  ];

  constructor() {
    this.onRating = new EventEmitter<number>();
  }

  ngOnInit(): void {
    if (this.selectedRating > 0) this.handleSelectStar(this.selectedRating);
  }

  public handleSelectStar(value: number): void {
    if (this.selectedRating == 0) {
      this.stars.filter((star) => {
        if (star.id <= value) {
          star.class = 'star-gold star';
        } else {
          star.class = 'star-gray star';
        }
        this.selectedRating = value;
        this.onRating.emit(this.selectedRating);
        return star;
      });
    } else {
      this.stars.filter((star) => {
        if (star.id <= this.selectedRating) {
          star.class = 'star-gold star';
        } else {
          star.class = 'star-gray star';
        }
        return star;
      });
    }
  }
}

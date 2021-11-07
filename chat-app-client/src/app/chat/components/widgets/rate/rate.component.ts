import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { entryAnimation } from '../../../animations/entry.animation';

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
  @Input() user!: string | null;
  @Input() selectedRating!: number;
  @Input() maxStars!: number;
  @Output() onRating!: EventEmitter<number>;

  public stars!: { id: number; icon: string; class: string }[];

  constructor() {
    this.onRating = new EventEmitter<number>();
    this.stars = [];
  }

  ngOnInit(): void {
    this.loadStarsList();
    if (this.selectedRating > 0) this.handleSelectStar(this.selectedRating);
  }

  /**
   * @description handles click event when user chooses a rating
   * @param {number} value - rating
   */
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

  /**
   * @description generate n stars based on command data
   */
  private loadStarsList(): void {
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push({
        class: 'star-gray star-hover star',
        icon: 'star',
        id: i + 1,
      });
    }
  }
}

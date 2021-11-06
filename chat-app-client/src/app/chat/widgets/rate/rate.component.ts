import { Component } from '@angular/core';

@Component({
  selector: 'ott-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent {
  selectedRating = 0;
  stars = [
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

  constructor() {}

  selectStar(value: any): void {
    // prevent multiple selection
    if (this.selectedRating === 0) {
      this.stars.filter((star) => {
        if (star.id <= value) {
          star.class = 'star-gold star';
        } else {
          star.class = 'star-gray star';
        }

        return star;
      });
    }

    this.selectedRating = value;
  }
}

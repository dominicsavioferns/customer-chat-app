import { animation, style, animate } from '@angular/animations';

export const entryAnimation = animation([
  style({ opacity: '{{opacity}}' }),
  animate('{{time}}'),
]);

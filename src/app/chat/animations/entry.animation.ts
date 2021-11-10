import { animation, style, animate } from '@angular/animations';

/**
 * animation for every item that is rendered into the messages section
 */
export const entryAnimation = animation([
  style({ opacity: '{{opacity}}' }),
  animate('{{time}}'),
]);

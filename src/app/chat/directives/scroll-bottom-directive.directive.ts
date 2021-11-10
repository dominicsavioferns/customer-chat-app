import { Directive, ElementRef } from '@angular/core';

/**
 * Directive that listens for any change in the element
 * so that it can scroll down to the bottom on every change in the DOM of the element
 */
@Directive({
  selector: '[ottScrollBottom]',
})
export class ScrollBottomDirective {
  private observer: any;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(function (_) {});
      this.scrollToBottom();
    });
    var config = { childList: true };

    this.observer.observe(this.el.nativeElement, config);
  }

  /**
   * @description method to scroll to the bottom of the element
   */
  private scrollToBottom(): void {
    try {
      this.el.nativeElement.scrollTo({
        top: this.el.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (err) {}
  }
}

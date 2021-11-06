import { Directive, ElementRef } from '@angular/core';

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
    var config = { attributes: true, childList: true, characterData: true };

    this.observer.observe(this.el.nativeElement, config);
  }

  private scrollToBottom(): void {
    try {
      this.el.nativeElement.scrollTo({
        top: this.el.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (err) {}
  }
}

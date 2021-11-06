import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ottChangeDirective]',
})
export class ChangeDirectiveDirective {
  private observer: any;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        console.log(mutation.type);
      });
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

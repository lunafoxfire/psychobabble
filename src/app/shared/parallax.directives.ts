import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appEaseScroll]'
})
export class EaseScrollDirective {
  private transformY = 0;
  @Input('appEaseScroll') private debug: string;
  constructor(el: ElementRef) {
    window.addEventListener('scroll', (e) => {
      requestAnimationFrame(() => {
        this.doParallax(el.nativeElement);
      });
    });
  }

  private doParallax(el) {
    const windowHeight = window.innerHeight;
    const coords = el.getBoundingClientRect();
    const elBottom = coords.bottom - this.transformY;
    const elTop = coords.top - this.transformY;
    if (this.debug === 'debug') { console.log(elTop); }
    if (elBottom > windowHeight) {
      this.transformY = 0;
    }
    else {
      const scrollPercent = Math.min(1 - elBottom / windowHeight, 1);
      const scrollAmount = windowHeight - elBottom;
      this.transformY = scrollPercent * scrollAmount / 2;
    }
    el.style.transform = `translateY(${this.transformY}px)`;
  }
}


@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input('appParallax') private magnitude: number;
  private transformY = 0;
  constructor(el: ElementRef) {
    window.addEventListener('scroll', (e) => {
      requestAnimationFrame(() => {
        this.doParallax(el.nativeElement);
      });
    });
  }

  private doParallax(el) {
    const windowHeight = window.innerHeight;
    const coords = el.getBoundingClientRect();
    const elTop = coords.top - this.transformY;
    const elHeight = coords.height;
    const scrollAmount = windowHeight - elTop;
    this.transformY = -scrollAmount * this.magnitude;
    el.style.transform = `translateY(${this.transformY}px)`;
  }
}

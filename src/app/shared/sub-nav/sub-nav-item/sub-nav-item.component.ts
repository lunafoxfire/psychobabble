import { Component, OnChanges, Input, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'sub-nav-item',
  templateUrl: './sub-nav-item.component.html',
  styleUrls: ['./sub-nav-item.component.scss']
})
export class SubNavItemComponent implements OnChanges {
  @HostBinding('class') class: string;
  @Input() active: boolean;
  constructor(
    public element: ElementRef
  ) { }

  ngOnChanges() {
    this.setActiveClass();
  }

  setActiveClass() {
    if (this.element.nativeElement.hasAttribute('active') || this.active === true) {
      this.class = "active";
    }
    else {
      this.class = null;
    }
  }
}

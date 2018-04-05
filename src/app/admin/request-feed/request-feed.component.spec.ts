import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFeedComponent } from './request-feed.component';

describe('RequestFeedComponent', () => {
  let component: RequestFeedComponent;
  let fixture: ComponentFixture<RequestFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

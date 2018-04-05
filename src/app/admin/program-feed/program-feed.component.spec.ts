import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFeedComponent } from './program-feed.component';

describe('ProgramFeedComponent', () => {
  let component: ProgramFeedComponent;
  let fixture: ComponentFixture<ProgramFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyLoggedInComponent } from './already-logged-in.component';

describe('AlreadyLoggedInComponent', () => {
  let component: AlreadyLoggedInComponent;
  let fixture: ComponentFixture<AlreadyLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlreadyLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
